const { join } = require('path');
const { copy } = require('fs-extra');

const copyBlocksFolder = async (projectPath) => {
  const sourcePath = join(projectPath, 'vendor', 'infinum', 'eightshift-blocks', 'blocks');
  const targetPath = join(projectPath, 'wp-content', 'themes', 'eightshift-boilerplate', 'src', 'blocks');

  // Copy folder
  await copy(sourcePath, targetPath);
};

module.exports = {
  copyBlocksFolder,
};
