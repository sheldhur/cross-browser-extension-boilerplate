import { readJson } from '../utils/fs';

type Pkg = {
  version: string;
  name: string,
  description: string,
  displayName: string,
}

let pkg: Pkg;

export async function readPackageJson() {
  console.log('Read package.json');
  pkg = await readJson('./package.json');
}

export { pkg };
