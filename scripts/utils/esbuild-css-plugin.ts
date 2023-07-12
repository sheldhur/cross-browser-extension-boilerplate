import { OnLoadResult, PluginBuild } from 'esbuild';
import fse from 'fs-extra';
import postcss, { AcceptedPlugin } from 'postcss';

import { dirname, parse } from 'path';

const getModule = async (moduleName: string) => {
  try {
    return (await import(moduleName)).default
  } catch {
    throw new Error(`Missing module. Please install '${moduleName}' package.`)
  }
}

const renderStyle = async (source: string, filePath: string): Promise<string | undefined> => {
  const { ext } = parse(filePath);

  if (ext === '.css') {
    return source;
  }

  if (ext === '.scss') {
    const sass = await getModule('sass')
    return sass.compileString(source).css.toString()
  }

  if (ext === '.less') {
    const less = await getModule('less')
    return (await less.render(source)).css
  }

  throw new Error(`Can't render style: ${filePath}`);
}


type CssPluginProps = {
  plugins: AcceptedPlugin[],
  inject?: boolean,
}

export function esbuildCssPlugin(options: CssPluginProps) {
  return {
    name: 'css-plugin',
    setup: (build: PluginBuild) => build.onLoad(
      { filter: /\.(css|scss|less)$/, namespace: 'file' },
      async (args): Promise<OnLoadResult> => {
        const contentRaw = await fse.readFile(args.path, 'utf-8');
        const cssResult = await postcss(options.plugins).process(contentRaw!, {
          from: args.path,
          to: undefined,
        });
        const result = await renderStyle(cssResult.css.toString(), args.path);

        if (options.inject) {
          const cssId = Math.random().toString(36).substring(2);
          const contents = `
            if(!document.getElementById('${cssId}')) {
              const s=document.createElement("style");
              s.id='${cssId}';
              s.textContent=\`${result}\`;
              document.head.append(s)
            }
          `;
          return { contents, loader: 'js' };
        }

        return {
          pluginData: result,
          resolveDir: dirname(args.path),
        };
      }),
  };
}
