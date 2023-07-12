export type ManifestContentScript = {
  matches?: string[];
  exclude_matches?: string[];
  css?: string[];
  js?: string[];
  run_at?: 'document_idle' | 'document_start' | 'document_end';
  all_frames?: boolean;
  match_about_blank?: boolean;
  include_globs?: string[];
  exclude_globs?: string[];
};
