const { join } = require('path');
const { copy } = require('fs-extra');

const copyBlocksFolder = async(projectPath) => {
  const sourcePath = join(projectPath, 'node_modules', '@eightshift', 'frontend-libs', 'blocks', 'init');
  const targetPath = join(projectPath, 'src', 'blocks');

  // Copy folder
  await copy(sourcePath, targetPath);
};

module.exports = {
  copyBlocksFolder,
};
