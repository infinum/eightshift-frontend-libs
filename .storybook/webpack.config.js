/* eslint-disable global-require*/

const path = require('path');

module.exports = ({ config }) => {
  const nodeModules = path.resolve(__dirname, '..');
  return require('./../webpack/storybook')({ config }, nodeModules, false);
};
