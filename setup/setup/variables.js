const { join } = require('path');

const eightshiftLibsModuleName = join('infinum/eightshift-libs');
const eightshiftBlocksModuleName = join('infinum/eightshift-blocks');
const eightshiftBlocksPath = join(`vendor/${eightshiftBlocksModuleName}`);

module.exports = {
  eightshiftLibsModuleName,
  eightshiftBlocksModuleName,
  eightshiftBlocksPath,
};
