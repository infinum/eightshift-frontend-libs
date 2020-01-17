const { join } = require('path');
const { copy, pathExists } = require('fs-extra');

/**
 * Copies some blocks / components (see `blocksToCopy` && `componentsToCopy`) from eightshift-frontend-libs to the project.
 *
 * @param  {string} projectPath Path to the project, needed to figure out where to pull blocks from.
 * @return {Promise}
 */
const copyAssets = async (projectPath) => {

  const sourcePath = join(projectPath, 'node_modules', '@eightshift', 'frontend-libs', 'blocks', 'init', 'assets');
  const targetPath = join(projectPath, 'assets');

  // Copy assets
  if (!pathExists(sourcePath)) {
    throw Error(`Missing sourcePath: ${sourcePath}`);
  }

  if (!pathExists(targetPath)) {
    throw Error(`Missing targetPath: ${targetPath}`);
  }

  await copy(sourcePath, targetPath);
};

module.exports = {
  copyAssets,
};

