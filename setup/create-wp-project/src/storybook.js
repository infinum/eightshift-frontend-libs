const { join } = require('path');
const { copy, pathExists } = require('fs-extra');

/**
 * Copies some blocks / components (see `blocksToCopy` && `componentsToCopy`) from eightshift-frontend-libs to the project.
 *
 * @param  {string} projectPath Path to the project, needed to figure out where to pull blocks from.
 * @return {Promise}
 */
const copyStorybook = async (projectPath) => {

  const sourcePath = join(projectPath, 'node_modules', '@eightshift', 'frontend-libs', 'blocks', 'init', 'storybook');
  const targetPath = join(projectPath, '.storybook');

  if (!pathExists(sourcePath)) {
    throw Error(`Error while copying Storybook, missing sourcePath: ${sourcePath}`);
  }

  await copy(sourcePath, targetPath);
};

module.exports = {
  copyStorybook,
};

