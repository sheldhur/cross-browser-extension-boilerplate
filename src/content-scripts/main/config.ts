import { ManifestContentConfig, ManifestContentScript } from '@types';

export function main({ hostPermissions }: ManifestContentConfig): ManifestContentScript {
  return {
    matches: hostPermissions,
    run_at: 'document_start',
  };
}
