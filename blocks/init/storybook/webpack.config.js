/* eslint-disable global-require*/

const path = require('path');

module.exports = ({ config }) => {
  return require('./../node_modules/@eightshift/frontend-libs/webpack/storybook')({ config }, path.resolve(__dirname, '..'));
};
