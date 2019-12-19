# Register Webpack

## Default Config

In order to use this library, you'll need to have a `webpack.config.js` file in the root of your theme.

This file holds basic configuration that will build your assets correctly and provide browsersync functionality. 

`webpack.config.js` is a main entrypoint for webpack config and looks like this:

```js
/* eslint-disable import/no-dynamic-require, global-require */

module.exports = (env, argv) => {

  const projectConfig = {
    config: {
      projectDir: __dirname, // Current project directory absolute path.
      projectUrl: 'local-url.test', // Used for providing browsersync functionality.
      projectPath: 'wp-content/themes/your-theme-name', // Project path relative to project root.
      assetsPath: 'src/blocks/assets', // Assets path after projectPath location.
      outputPath: 'public', // Public output path after projectPath location.
    },
  };

  // Generate webpack config for this project using options object.
  const project = require('./node_modules/@eightshift/frontend-libs/webpack')(argv.mode, projectConfig);

  return {
    ...project,
  };
};
```

## Override built-in functionality

To remove built-in functionality, add a new object to the config called `overrides`.
If you provide any of the `overrides keys` set to `true`, it will remove that config from the build.
Here is a list of all the features that we use and how to remove them.

```js

const projectConfig = {
  config: {
    ...
  },
  overrides: {
    application: true,
    applicationAdmin: true,
    applicationBlocks: true,
    applicationBlocksEditor: true,
    filename: true,
    cleanWebpackPlugin: true,
    terserPlugin: true,
    browserSyncPlugin: true,
    providePlugin: true,
    manifestPlugin: true,
    miniCssExtractPlugin: true,
    copyWebpackPlugin: true,
    optimizeCSSAssetsPlugin: true,
    js: true,
    scss: true,
    images: true,
    fonts: true,
    runtimeChunk: true,
  }
}
```

## Add Custom build

If you want to add something custom to your build, you can simply use all the native [webpack features](https://webpack.js.org/guides/) by providing it like in the example:

```js
/* eslint-disable import/no-dynamic-require, global-require */

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {

  ...

  return {
    ...project,
    plugin: [
      new HtmlWebpackPlugin(),
    ]
  };
};

```
