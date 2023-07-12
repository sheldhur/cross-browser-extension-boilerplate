import { ManifestContentScript } from './manifest-content-script';
import { ManifestBrowserSpecificSettings } from './manifest-browser-specific-settings';

/**
 * rollup-plugin-chrome-extension
 * https://github.com/extend-chrome/rollup-plugin-chrome-extension
 */
export interface ManifestV3 {
  manifest_version: 3;
  name: string;
  version: string;
  default_locale?: string;
  description?: string;
  icons?: chrome.runtime.ManifestIcons;
  action?: chrome.runtime.ManifestAction;
  author?: string;
  background?: {
    service_worker: string;
    type?: 'module';
  };
  chrome_settings_overrides?: {
    homepage?: string;
    search_provider?: chrome.runtime.SearchProvider;
    startup_pages?: string[];
  };
  chrome_ui_overrides?: {
    bookmarks_ui?: {
      remove_bookmark_shortcut?: boolean;
      remove_button?: boolean;
    }
  };
  chrome_url_overrides?: {
    bookmarks?: string;
    history?: string;
    newtab?: string;
  }
  commands?: Record<string, {
    suggested_key?: {
      default?: string;
      windows?: string;
      mac?: string;
      chromeos?: string;
      linux?: string;
    };
    description?: string;
    global?: boolean;
  }>;
  content_capabilities?: {
    matches?: string[];
    permissions?: string[];
  };
  content_scripts?: ManifestContentScript[]
  content_security_policy?: {
    extension_pages?: string;
    sandbox?: string;
  };
  converted_from_user_script?: boolean;
  current_locale?: string;
  declarative_net_request?: {
    rule_resources: DeclarativeNetRequestResource[];
  };
  devtools_page?: string;
  event_rules?: {
    event?: string;
    actions?: {
      type: string;
    }[];
    conditions?: chrome.declarativeContent.PageStateMatcherProperties[];
  }[];
  externally_connectable?: {
    ids?: string[];
    matches?: string[];
    accepts_tls_channel_id?: boolean;
  };
  file_browser_handlers?: {
    id?: string;
    default_title?: string;
    file_filters?: string[];
  }[];
  file_system_provider_capabilities?: {
    configurable?: boolean;
    watchable?: boolean;
    multiple_mounts?: boolean;
    source?: string;
  };
  homepage_url?: string;
  host_permissions?: string[];
  import?: {
    id: string;
    minimum_version?: string;
  }[];
  export?: {
    whitelist?: string[];
  };
  incognito?: string;
  input_components?:  {
    name?: string;
    type?: string;
    id?: string;
    description?: string;
    language?: string;
    layouts?: string[];
  }[];
  key?: string;
  minimum_chrome_version?: string;
  nacl_modules?: {
    path: string;
    mime_type: string;
  }[];
  oauth2?: {
    client_id: string;
    scopes?: string[];
  };
  offline_enabled?: boolean;
  omnibox?: {
    keyword: string;
  };
  optional_permissions?:
    | chrome.runtime.ManifestPermissions[]
    | string[]
  options_page?: string;
  options_ui?: {
    page?: string;
    chrome_style?: boolean;
    open_in_tab?: boolean;
  };
  permissions?: chrome.runtime.ManifestPermissions[] | string[];
  platforms?: {
    nacl_arch?: string;
    sub_package_path: string;
  }[];
  plugins?: {
    path: string;
  }[];
  requirements?: {
    '3D'?: {
      features?: string[];
    };
    plugins?: {
      npapi?: boolean;
    };
  };
  sandbox?: {
    pages: string[];
    content_security_policy?: string;
  };
  short_name?: string;
  spellcheck?: {
    dictionary_language?: string;
    dictionary_locale?: string;
    dictionary_format?: string;
    dictionary_path?: string;
  };
  storage?: {
    managed_schema: string;
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
  web_accessible_resources?: (WebAccessibleResourceById | WebAccessibleResourceByMatch)[];

  browser_specific_settings?: ManifestBrowserSpecificSettings;
}

interface DeclarativeNetRequestResource {
  id: string;
  enabled: boolean;
  path: string;
}

interface WebAccessibleResourceByMatch {
  matches: string[];
  resources: string[];
  use_dynamic_url?: boolean;
}

interface WebAccessibleResourceById {
  extension_ids: string[];
  resources: string[];
  use_dynamic_url?: boolean;
}
