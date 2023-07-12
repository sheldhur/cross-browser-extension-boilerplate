import { Browsers } from 'get-installed-browsers';

import fs from 'fs';
import { resolve } from 'path';

import { BuildError } from './build-error';
import { toKebabCase } from './to-kebab-case';
import { paths } from '../paths';

const platform = process.platform;

const manifest = {
  other: undefined,
  chrome: 3,
  safari: 2,
  firefox: 2,
};

type BrowserPaths = {
  type: keyof typeof manifest;
  path?: string[];
  name: string;
  fullName: string;
  manifestVersion: number;
  profilePath: string;
}

export type Browser = Omit<BrowserPaths, 'path'> & {
  path?: string;
  name: string;
  fullName: string;
  manifestVersion: number;
}

export const browsers = Browsers.map(({ type, name: fullName, path}) => {
  const name = toKebabCase(fullName);
  return {
    name,
    path: path[platform],
    type,
    manifestVersion: manifest[type],
    fullName,
    profilePath: resolve(paths.profiles, name),
  };
}).filter(({ manifestVersion }) => manifestVersion) as BrowserPaths[];

export function getBrowser(browserName: string, withPath?: boolean): Browser {
  const prompt = `Search browser ${browserName}`;
  console.time(prompt);

  const browser = browsers.find(({ name }) => browserName === name);
  if (!browser) {
    throw new BuildError(`Unsupported browser ${name}`);
  }

  const path = withPath ? browser.path?.find(fs.existsSync) : undefined;

  console.timeEnd(prompt);

  return { ...browser, path };
}
