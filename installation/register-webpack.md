# Register Webpack

In order to use libraries webpack you'll need to have a `webpack.config.js` and `webpack-project.config.js` files in the root of your theme.

`webpack.config.js` is a main entrypoint for webpack config and looks like this

```js
/* eslint-disable import/no-dynamic-require, global-require */

const merge = require('webpack-merge');
const projectConfig = require('./webpack-project.config');

module.exports = (env, argv) => {

  // Generate webpack config for this project using options object.
  const project = require('./node_modules/@eightshift/frontend-libs/webpack/index.js')(argv.mode, projectConfig);

  // You can append project specific config using this object.
  const projectSpecific = {};

  // Output webpack.
  return merge(project, projectSpecific);
};
```

The `webpack-project.config.js` looks like this

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
};
```

This file holds basic configuration that will build your assets correctly and provide browsersync functionality. 
