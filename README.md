# Cross Browser Extension Boilerplate

Supports TypeScript, React, PostCSS, Manifest V3 and Manifest V2. Cross browser building for Chrome, Firefox, Safari, Edge, etc.
It isn't a framework. This template assists you starting your cross-browser extension, and you can customise it for you, e.g. use `styled-components` or `preact`.

## Features

- 💪 TypeScript
- 🚀 React
- 🎨 PostCSS with support LESS and SCSS
- 📜 Manifest V3 and Manifest V2
- 🔄 Extension hot reload for Chromium and Firefox browsers
- ⛺ Opens a target browser with a temporary profile for development

## Commands

#### Develop
```shell
npm i
npm run start -- --browser=chrome,firefox
```

#### Packaging
```shell
npm run build -- --browser=chrome,firefox
```

#### Additional
Add `webextension-polyfill` to your project if you don't want to worry about the code compatibility, and use the `browser` namespace for the extension API call.
```angular2html
npm -i webextension-polyfill
npm -i -D @types/webextension-polyfill
```

## Structure

```
|-- scripts : scripts for build and start development
|-- src : source code
    |-- background : service worker script
    |-- common : some common deps
        |-- config
        |-- helpers
        |-- assets
        |-- ...
    |-- content-scripts : scripts and styles for run in context of web pages
        |-- global
        |-- some-site-a
        |-- some-site-b
        |-- ...
    |-- manifest : scripts for generate manifest files
    |-- pages : HTML content, for eg. options or popup window
        |-- options : UI for extension options
        |-- popup : UI for popup window
        |-- ...
    |-- public : another files e.g. icons, this dir will be copied to build without any transformations
```

##
If you have any questions or comments, please create a new issue.
