import { browsers } from './browsers';
import { BuildError } from './build-error';

type Args = {
  browsers: string[];
  runBrowser: boolean;
  watch: boolean;
  archive: boolean;
};

export function getArgs() {
  const args = process.argv.reduce((acc, cur) => {
    const match = cur.match(/--(\w+)=([\w,]+)/i);
    if (match) {
      const name = match[1];
      const value = match[2].toLowerCase();

      return ({ ...acc, [name]: value });
    }

    const match2 = cur.match(/--(\w+)/i);
    if (match2) {
      const name = match2[1];

      return ({ ...acc, [name]: true });
    }

    return acc;
  }, {} as Args & { browser: string });

  if (args.browser) {
    args.browsers = args.browser.split(',');
  }

  const isBrowserExist = browsers.filter(Set.prototype.has, new Set(args.browser));
  if (!isBrowserExist) {
    const lines = [];
    lines.push('Usage: npm run build -- --browser=<browser>');
    lines.push('browsers:');
    browsers.forEach(({ name }) => {
      lines.push(` - ${name}`);
    });

    throw new BuildError(lines.join('\r\n'));
  }

  return args;
}
