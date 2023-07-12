import fse from 'fs-extra';
import watch from 'node-watch';

import { relative, resolve } from 'path';

import {
  builderEntryHtml,
  builderEntryScript,
  builderGetEntries,
  builderManifest,
} from './builder';
import { paths } from '../paths';
import { copyDir } from '../utils';

async function rebuildManifest(versions: number[]) {
  const entries = await builderGetEntries();
  await Promise.all(versions.map(async (version) => {
    const versionOutDir = resolve(paths.dist, `v${version}`);
    await builderManifest(version, versionOutDir, entries);
  }));
}

async function copyRebuild(versions: number[], outDir: string) {
  await Promise.all(versions.map(async (version) => {
    const versionOutDir = resolve(paths.dist, `v${version}`, relative(paths.distCommon, outDir));
    await fse.remove(versionOutDir);
    await fse.copy(outDir, versionOutDir);
  }));
}

export function startWatching(versions: number[]) {
  watch(paths.src, { recursive: true, delay: 3000, persistent: true }, async (event, filePath) => {
    console.clear();

    if (event === 'remove') {
      return;
    }

    const relativePath = relative(paths.src, filePath);
    const [, dirName] = relativePath.split('/');
    console.log(`Changed: ${relativePath}`);

    if (filePath.startsWith(paths.public)) {
      console.log(`Copy: ${relativePath}`);
      await copyDir(paths.public, paths.distCommon);
      await copyRebuild(versions, paths.distPublic);
    }

    if (filePath.startsWith(paths.pages)) {
      console.log(`Rebuild page: ${relativePath}`);

      const inputDir = resolve(paths.pages, dirName);
      const outDir = resolve(paths.distPages, dirName);
      await builderEntryHtml(inputDir, outDir);
      await copyRebuild(versions, outDir);
    }

    if (filePath.startsWith(paths.contentScripts)) {
      console.log(`Rebuild script: ${relativePath}`);

      const inputDir = resolve(paths.contentScripts, dirName);
      const outDir = resolve(paths.distContentScripts, dirName);
      await builderEntryScript(inputDir, outDir);
      await copyRebuild(versions, outDir);
    }

    if (filePath.startsWith(paths.background)) {
      console.log(`Rebuild script: ${relativePath}`);
      await builderEntryScript(resolve(paths.background), resolve(paths.distBackground));
      await copyRebuild(versions, paths.distBackground);
    }

    if (filePath.startsWith(paths.manifest)) {
      console.log('Manifest rebuilding is not available now. You should restart build manual');
      process.exit(1);
    }

    if (filePath.startsWith(paths.manifest) || filePath.startsWith(paths.pages)) {
      await rebuildManifest(versions);
    }

    console.log('Watching for changes...\n');
  });
}
