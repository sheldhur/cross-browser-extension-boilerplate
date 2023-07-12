import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const paths = {
  root: __dirname,
  dist: resolve(__dirname, 'dist'),
  distCommon: resolve(__dirname, 'dist', 'common'),
  distPages: resolve(__dirname, 'dist', 'common', 'pages'),
  distPublic: resolve(__dirname, 'dist', 'common', 'public'),
  distBackground: resolve(__dirname, 'dist', 'common', 'background'),
  distContentScripts: resolve(__dirname, 'dist', 'common', 'content-scripts'),

  src: resolve(__dirname, 'src'),
  pages: resolve(__dirname, 'src', 'pages'),
  public: resolve(__dirname, 'src', 'public'),
  manifest: resolve(__dirname, 'src', 'manifest'),
  background: resolve(__dirname, 'src', 'background'),
  contentScripts: resolve(__dirname, 'src', 'content-scripts'),

  profiles: resolve(__dirname, 'tmp', 'profiles'),
}
