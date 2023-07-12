import { ManifestV2, ManifestConfig, ManifestContentScript } from '@types';

export function buildManifestV2(
  config: ManifestConfig,
  hostPermissions: string[],
  contentScripts: ManifestContentScript[],
): ManifestV2 {
  const {
    pages,
    background,
    version,
    description,
    name
  } = config;

  const manifest: ManifestV2 = {
    manifest_version: 2,
    name,
    version,
    description,
    icons: {
      '128': '/public/icon-128.png',
    },
    permissions: [
      'activeTab',
      'storage',
      'tabs',
      ...hostPermissions,
    ],
    content_scripts: contentScripts,
    browser_action: {},
    browser_specific_settings: {
      gecko: {
        id: 'addon@example.com',
      }
    },
  };

  if (background) {
    manifest.background = {
      scripts: [background],
    };
  }

  if (pages.options) {
    manifest.options_ui = {
      page: pages.options,
    };
  }

  if (pages.popup) {
    manifest.browser_action = {
      default_popup: pages.popup,
      default_icon: manifest.icons?.['128'],
    };
  }

  if (pages.devtools) {
    manifest.devtools_page = pages.devtools;
  }

  return manifest;
}
