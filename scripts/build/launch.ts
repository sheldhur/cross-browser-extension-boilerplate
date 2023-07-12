import { Browser, BuildError } from '../utils';

type LaunchConfig = Record<string, string | null>;

function makeLaunchConfig(browser: Browser, sourceDir: string) {
  if (!browser.path) {
    throw new BuildError(`${browser.name} binary not found!`);
  }

  const defaultConfig: LaunchConfig = {
    'start-url': 'https://example.com',
    'profile-create-if-missing': null,
    'browser-console': null,
    'keep-profile-changes': null,
    'source-dir': sourceDir,
  };

  const config: LaunchConfig = {};
  switch (browser.type) {
    case 'chrome': {
      config['target'] = 'chromium';
      config['chromium-binary'] = `'${browser.path}'`;
      config['chromium-profile'] = `'${browser.profilePath}'`;
      break;
    }
    case 'firefox': {
      config['firefox-binary'] = `'${browser.path}'`;
      config['firefox-profile'] = `'${browser.profilePath}'`;
      break;
    }
    default: {
      throw new BuildError(`${browser.name} auto-reloading is not supported. Reload manually!`);
    }
  }

  return { ...defaultConfig, ...config };
}

function makeLaunchCommand(config: LaunchConfig) {
  const command = 'web-ext run';
  const args = Object.entries(config).map(([key, value]) => (
    value === null ? key : `${key}=${value}`
  ));

  return [command, ...args].join(' --');
}

export function launchBrowser(browser: Browser, sourceDir: string) {
  try {
    const config = makeLaunchConfig(browser, sourceDir);
    return makeLaunchCommand(config);
  } catch (err) {
    if (err instanceof BuildError) {
      console.log('');
      console.log(err.message);
      console.log('');
    } else {
      throw err;
    }
  }
}
