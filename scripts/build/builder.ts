import { ManifestEntryPoints } from '@types';
import { build } from 'esbuild';
import fse from 'fs-extra';

import { relative, resolve } from 'path';

import { pkg } from './pkg';
import { makeConfig } from '../../esbuild.config';
import { buildManifest } from '../../src/manifest';
import { paths } from '../paths';
import { BuildError, copyDir, createDir, getEntryPoint } from '../utils';

export function builderEntry(entryPoints: string[], outDir: string, isHtml?: boolean) {
  const config = makeConfig(entryPoints, outDir, isHtml);
  return build(config);
}

export async function builderEntryHtml(inputDir: string, outDir: string) {
  const rInputDir = relative(paths.src, inputDir);
  const prompt = `Building page entry point ${rInputDir}`;
  console.time(prompt);

  await fse.remove(outDir);
  const entryPoints = await getEntryPoint(inputDir, 'html');

  if (entryPoints.length === 0) {
    throw new BuildError(`Can't found index.html for page entry point: ${rInputDir}`);
  }

  await builderEntry(entryPoints, outDir, true);
  await fse.remove(resolve(outDir, 'index.js')); // file isn't used in build
  console.timeEnd(prompt);
}

export async function builderEntryScript(inputDir: string, outDir: string) {
  const rInputDir = relative(paths.src, inputDir);
  const prompt = `Building script entry point ${rInputDir}`;
  console.time(prompt);

  await fse.remove(outDir);
  const entryPoints = await getEntryPoint(inputDir, 'ts');

  if (entryPoints.length === 0) {
    throw new BuildError(`Can't found index.js for script entry point: ${rInputDir}`);
  }

  await builderEntry(entryPoints, outDir);
  console.timeEnd(prompt);
}

export async function builderGetEntriesSubDir<T>(
  outDir: string,
  callback: (path: string) => T | Promise<T>
): Promise<Record<string, T>> {
  const dirs = await fse.readdir(outDir, { withFileTypes: true });

  const result = await Promise.all(
    dirs
      .filter((dir) => dir.isDirectory())
      .map(async (dir) => [dir.name, await callback(resolve(outDir, dir.name))])
  );

  return Object.fromEntries(result);
}

export async function builderGetEntries() {
  const [
    background,
    content,
    pages,
  ] = await Promise.all([
    getEntryPoint(paths.distBackground, 'build').then(
      (entries) => relative(paths.distCommon, entries.find((entry) => entry.endsWith('.js'))!)
    ),
    builderGetEntriesSubDir(
      paths.distContentScripts,
      (path) => getEntryPoint(path, 'build').then((entries) => ({
        js: relative(paths.distCommon, entries.find((entry) => entry.endsWith('.js'))!),
        css: relative(paths.distCommon, entries.find((entry) => entry.endsWith('.css'))!),
      })),
    ),
    builderGetEntriesSubDir(
      paths.distPages,
      (path) => getEntryPoint(path, 'html').then(
        (entries) => relative(paths.distCommon, entries[0])
      ),
    ),
  ])

  return {
    background,
    pages,
    content,
  }
}

export async function builderManifest(version: number, outDir: string, entries: ManifestEntryPoints) {
  const prompt = `Building manifest v${version}`;
  console.time(prompt);

  const obj = buildManifest(version, {
    ...entries,
    version: pkg.version,
    name: pkg.displayName,
    description: pkg.description,
  });

  if (!obj) {
    throw new BuildError(`Can't get manifest v${version} builder`);
  }

  await fse.writeJSON(resolve(outDir, `manifest.json`), obj, { spaces: 2 });
  console.timeEnd(prompt);
}

export async function builderCommon() {
  await fse.remove(paths.distCommon);
  return Promise.all([
    builderGetEntriesSubDir(paths.pages, (path) =>
      builderEntryHtml(path, resolve(paths.distPages, relative(paths.pages, path)))
    ),
    builderGetEntriesSubDir(paths.contentScripts, (path) =>
      builderEntryScript(path, resolve(paths.distContentScripts, relative(paths.contentScripts, path)))
    ),
    builderEntryScript(resolve(paths.background), resolve(paths.distBackground)),
    copyDir(paths.public, paths.distCommon),
  ]);
}

export async function builderVersion(version: number, entries: ManifestEntryPoints) {
  const prompt = `Build v${version}`;
  console.time(prompt);

  const outPath = resolve(paths.dist, `v${version}`);
  await fse.remove(outPath);
  await createDir(outPath);

  await Promise.all([
    builderManifest(version, outPath, entries),
    copyDir(paths.distBackground, outPath),
    copyDir(paths.distContentScripts, outPath),
    copyDir(paths.distPages, outPath),
    copyDir(paths.distPublic, outPath),
  ]);

  console.timeEnd(prompt);
  return outPath;
}
