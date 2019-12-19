# Register Webpack

In order to use this library, you'll need to have a `webpack.config.js` and `webpack-project.config.js` files in the root of your theme.

`webpack.config.js` is a main entrypoint for webpack config and looks like this:

```js
/* eslint-disable import/no-dynamic-require, global-require */

const projectConfig = require('./webpack-project.config');

module.exports = (env, argv) => {

  // Generate webpack config for this project using options object.
  const project = require('./node_modules/@eightshift/frontend-libs/webpack/index.js')(argv.mode, projectConfig);

  return project;
};
```

The `webpack-project.config.js` looks like this:

```js
// All config and default setting overrides must be provided when using this object.

module.exports = {
  config: {
    projectDir: __dirname, // Current project directory absolute path.
    projectUrl: 'local-url.test', // Used for providing browsersync functionality.
    projectPath: 'wp-content/themes/your-theme-name', // Project path relative to project root.
    assetsPath: 'src/blocks/assets', // Assets path after projectPath location.
    outputPath: 'public', // Public output path after projectPath location.
  },
  overrides: { // Optional.
      // application: true,
      // applicationAdmin: true,
      // applicationBlocks: true,
      // applicationBlocksEditor: true,
      // filename: true,
      // cleanWebpackPlugin: true,
      // terserPlugin: true,
      // browserSyncPlugin: true,
      // providePlugin: true,
      // manifestPlugin: true,
      // miniCssExtractPlugin: true,
      // copyWebpackPlugin: true,
      // js: true,
      // scss: true,
      // images: true,
      // fonts: true,
      // runtimeChunk: true,
    },
};
```

This file holds basic configuration that will build your assets correctly and provide browsersync functionality. 

If you provide any of the `overrides key` set to `true` it will remove that config from the build.
