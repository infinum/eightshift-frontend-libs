# Webpack build

All config options:
```js
  const options = {
    config: {
      projectDir: __dirname,
      projectUrl: 'dev.boilerplate.com',
      projectPath: 'wp-content/themes/eightshift-boilerplate',
      assetsPath: 'src/blocks/assets',
      outputPath: 'public',
    },
    entry: {
      application: false,
      applicationAdmin: false,
      applicationBlocks: false,
      applicationBlocksEditor: false,
    },
    output: {
      filename: false,
    },
    plugins: {
      providePlugin: false,
      manifestPlugin: false,
      miniCssExtractPlugin: false,
      copyWebpackPlugin: false,
      browserSyncPlugin: false,
      cleanWebpackPlugin: false,
    },
    module: {
      js: false,
      images: false,
      fonts: false,
      scss: false,
    },
    optimization: {
      terserPlugin: false,
    },
  };
```
