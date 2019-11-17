
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const gutenberg = require('./../webpack/gutenberg')();

module.exports = ({ config }) => {

  config.resolve.alias = {...config.resolve.alias, ...gutenberg.resolve.alias};

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

  config.plugins.push(
    new MiniCssExtractPlugin()
  );

  config.module.rules.push({
    test: /\.stories\.js?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre'
  });

  return config;
};
