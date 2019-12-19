const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  config: {
    libNodeModules: path.resolve(__dirname, '..', 'node_modules'),
  }
};

const gutenberg = require('./../webpack/gutenberg')(config);

module.exports = ({ config }) => {

  /**
   * Load Project Aliases.
   */
  config.resolve.alias = {...config.resolve.alias, ...gutenberg.resolve.alias};

  /**
   * Generate css file from sass.
   */
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            url: false,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'import-glob-loader',
        },
      ],
    }
  );

  /**
   * Extract css from sass.
   */
  config.plugins.push(
    new MiniCssExtractPlugin()
  );

  return config;
};
