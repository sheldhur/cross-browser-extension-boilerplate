import { ManifestV3, ManifestConfig, ManifestContentScript } from '@types';

export function buildManifestV3(
  config: ManifestConfig,
  hostPermissions: string[],
  contentScripts: ManifestContentScript[],
): ManifestV3 {
  const {
    pages,
    background,
    version,
    description,
    name
  } = config;

  const manifest: ManifestV3 = {
    manifest_version: 3,
    name,
    version,
    description,
    icons: {
      '128': '/public/icon-128.png',
    },
    permissions: [
      'storage',
      'tabs',
    ],
    host_permissions: hostPermissions,
    content_scripts: contentScripts,
    action: {},
  }

  if (background) {
    manifest.background = {
      service_worker: background,
      type: 'module',
    };
  }

  if (pages.options) {
    manifest.options_ui = {
      page: pages.options,
    };
  }

  if (pages.popup) {
    manifest.action = {
      default_popup: pages.popup,
      default_icon: manifest.icons?.['128'],
    };
  }

  if (pages.newtab) {
    manifest.chrome_url_overrides = {
      newtab: pages.newtab,
    };
  }

  if (pages.bookmarks) {
    manifest.chrome_url_overrides = {
      bookmarks: pages.bookmarks,
    };
  }

  if (pages.history) {
    manifest.chrome_url_overrides = {
      history: pages.history,
    };
  }

  if (pages.devtools) {
    manifest.devtools_page = pages.devtools;
  }

  return manifest;
}
