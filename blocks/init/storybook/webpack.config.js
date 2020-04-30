/* eslint-disable global-require*/

const path = require('path');

module.exports = ({ config }) => require('./../node_modules/@eightshift/frontend-libs/webpack/storybook')(
  { config },
  path.resolve(__dirname, '..'),
  'src/blocks/manifest.json'
);
