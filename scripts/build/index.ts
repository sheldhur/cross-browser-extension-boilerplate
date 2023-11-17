import archiver from 'archiver';
import concurrently from 'concurrently';
import fse from 'fs-extra';

import { resolve } from 'path';

import {
  builderCommon,
  builderGetEntries,
  builderVersion,
} from './builder';
import { launchBrowser } from './launch';
import { readPackageJson, pkg } from './pkg';
import { startWatching } from './watch';
import { paths } from '../paths';
import { BuildError, createDir, getArgs, getBrowser } from '../utils';

(async () => {
  await readPackageJson();
  try {
    const {
      browsers,
      runBrowser,
      watch: isWatching,
      archive,
    } = getArgs();

    const browserList = browsers.map((name) => getBrowser(name, runBrowser));
    const versions = [...new Set(
      browserList.map(({ manifestVersion }) => (manifestVersion)),
    )];

    await builderCommon();
    const entries = await builderGetEntries();

    const versionBuildEntries = await Promise.all(versions.map(
      async (version) => [version, await builderVersion(version, entries)],
    ));
    const versionBuild: Record<number, string> = Object.fromEntries(versionBuildEntries);

    if (isWatching) {
      startWatching(versions);
    }

    if (runBrowser) {
      await fse.remove(paths.profiles);
      await createDir(paths.profiles);

      const commands = browserList.map((browser) =>
        launchBrowser(browser, versionBuild[browser.manifestVersion])
      ).filter((c) => !!c) as string[];
      const { result } = concurrently(commands);

      await result;
      console.log("All processes exited");
      process.exit(0);
    }

    if (archive) {
      await Promise.all(
        browserList.map(async (browser) => {
          const fileName = `${browser.name}_mv${browser.manifestVersion}_${pkg.name}_v${pkg.version}.zip`;
          const filePath = resolve(paths.dist, fileName);

          if (await fse.exists(filePath)) {
            console.log(`Already exists ${fileName}`);
          } else {
            const output = fse.createWriteStream(filePath);
            const zip = archiver('zip');
            zip.pipe(output);
            zip.directory(versionBuild[browser.manifestVersion], false);
            await zip.finalize();
          }
        }),
      )
    }
  } catch (err) {
    if (err instanceof BuildError) {
      console.log('');
      console.log(err.message);
      console.log('');

      process.exit(1);
    }

    throw err;
  }
})()
