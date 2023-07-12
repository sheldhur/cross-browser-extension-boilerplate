import { ManifestConfig, ManifestContentScript } from '@types';

import { buildManifestV2 } from "./build-manifest-v2";
import { buildManifestV3 } from "./build-manifest-v3";
import { contentScripts } from '../content-scripts';

export function buildManifest(version: number, config: ManifestConfig) {
  const hostPermissions = ['https://example.com/*'];
  if (process.env.NODE_ENV === 'development') {
    hostPermissions.push('http://localhost:3000/*');
  }

  const scripts = Object.entries(contentScripts)
    .map(([name, getConfig]): ManifestContentScript => ({
      ...getConfig({ hostPermissions }),
      js: [config.content[name].js],
      css: [config.content[name].css],
    }));

  switch (version) {
    case 2: {
      return buildManifestV2(config, hostPermissions, scripts);
    }
    case 3: {
      return buildManifestV3(config, hostPermissions, scripts);
    }
  }
}
