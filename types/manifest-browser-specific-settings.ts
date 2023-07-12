export type ManifestBrowserSpecificSettings = Record<string, {
  id?: string;
  strict_min_version?: string;
  strict_max_version?: string;
  update_url?: string;
}>;
