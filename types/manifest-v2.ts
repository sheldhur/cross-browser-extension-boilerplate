import { ManifestContentScript } from './manifest-content-script';
import { ManifestBrowserSpecificSettings } from './manifest-browser-specific-settings';

/**
 * rollup-plugin-chrome-extension
 * http://github.com/extend-chrome/rollup-plugin-chrome-extension
 */
export interface ManifestV2 {
  manifest_version: 2;
  name: string;
  version: string;
  default_locale?: string;
  description?: string;
  icons?: chrome.runtime.ManifestIcons;
  author?: string;
  background?: {
    page?: string;
    persistent?: boolean;
    scripts: string[];
    service_worker?: string;
    type?: string;
  };
  browser_action?: {
    browser_style?: boolean;
    default_icon?: chrome.runtime.ManifestIcons;
    default_title?: string;
    default_popup?: string;
    theme_icons?: chrome.runtime.ManifestIcons[];
  };
  commands?: Record<string, {
      suggested_key?: {
        default?: string;
        windows?: string;
        mac?: string;
        chromeos?: string;
        linux?: string;
      };
      description?: string;
    }>;
  content_scripts?: ManifestContentScript[];
  content_security_policy?: string;
  devtools_page?: string;
  externally_connectable?: {
    matches: string[];
    accepts_tls_channel_id?: boolean;
  };
  file_browser_handlers?:
    {
      id: string;
      default_title: string;
      file_filters: string[];
    }[];
  homepage_url?: string;
  import?: boolean;
  incognito?: 'spanning' | 'split' | 'not_allowed';
  input_components?:
    {
      id: string;
      name: string;
      description: string;
      type: 'ime' | 'xkb';
      layouts: string[];
    }[];
  key?: string;
  nacl_modules?:
    {
      path: string;
      mime_type: 'video/w+' | 'audio/w+' | 'application/w+';
    }[];
  oauth2?: {
    client_id?: string;
    scopes?: string[];
  };
  offline_enabled?: boolean;
  omnibox?: {
    keyword: string;
  };
  optional_permissions?: [];
  options_ui?: {
    page: string;
    browser_style?: boolean;
    open_in_tab?: boolean;
  };
  page_action?: {
    browser_style?: boolean;
    default_icon?: chrome.runtime.ManifestIcons;
    default_title?: string;
    default_popup?: string;
    theme_icons?: chrome.runtime.ManifestIcons[];
  };
  permissions?: chrome.runtime.ManifestPermissions[] | string[];
  platforms?: {
    nacl_arch?: string;
    sub_package_path: string;
  }[];
  requirements?: {
    '3D'?: {
      features?: string[];
    };
    plugins?:{
      npapi?: boolean;
    };
  };
  sandbox?:{
    pages: string[];
    content_security_policy?: string;
  };
  short_name?: string;
  signature?: {
    key: string;
    signature?: string;
  };
  spellcheck?: {
    dictionary_language?: string;
    dictionary_locale?: string;
    dictionary_format?: string;
    dictionary_path?: string;
  };
  storage?: {
    managed_schema?: string;
  };
  system_indicator?: {
    default_icon: chrome.runtime.ManifestIcons;
    default_title: string;
  };
  tts_engine?: {
    voices: {
      voice_name: string;
      lang?: string;
      gender?: string;
      event_types?: string[];
    }[];
  };
  update_url?: string;
  version_name?: string;
  web_accessible_resources?: string[];

  browser_specific_settings?: ManifestBrowserSpecificSettings;
}
