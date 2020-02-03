const path = require('path');

module.exports = ({ config }) => {
  const nodeModules = path.resolve(__dirname, '..');
  return require('./../node_modules/@eightshift/frontend-libs/webpack/storybook')({ config }, nodeModules); // eslint-disable-line global-require
};
