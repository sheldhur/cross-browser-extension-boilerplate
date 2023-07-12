import { ManifestContentScript } from '@types';

export function exampleNet(): ManifestContentScript {
  return {
    matches: ['https://example.net/*'],
    run_at: 'document_start',
  };
}
