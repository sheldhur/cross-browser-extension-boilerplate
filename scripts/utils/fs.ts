import fse from 'fs-extra';

import { resolve } from 'path';

export async function copyDir(path: string, outPath: string) {
  const dirName = path.split('/').pop();
  await fse.copy(path, resolve(outPath, dirName || ''));
}

export async function createDir(path: string) {
  if (await fse.exists(path)) {
    return;
  }

  await fse.mkdir(path, { recursive: true });
}
