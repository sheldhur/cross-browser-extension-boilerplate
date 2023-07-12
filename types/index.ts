export { ManifestV2 } from './manifest-v2';
export { ManifestV3 } from './manifest-v3';
export { ManifestContentScript } from './manifest-content-script';

export type ManifestEntryPoints = {
  pages: {
    options?: string;
    popup?: string;
    newtab?: string;
    bookmarks?: string;
    history?: string;
    devtools?: string;
  };
  content: Record<string, {
    js: string;
    css: string;
  }>;
  background: string;
}

export type ManifestConfig = ManifestEntryPoints & {
  name: string,
  version: string,
  description: string,
};

export type ManifestContentConfig = {
  hostPermissions: string[],
}
