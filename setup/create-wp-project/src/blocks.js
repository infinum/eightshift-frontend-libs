const { join } = require('path');
const { copy, pathExists } = require('fs-extra');

const componentsToCopy = [
  'button',
  'heading',
  'image',
  'link',
  'lists',
  'paragraph',
  'tracking',
  'video',
  'google-rich-snippets',
  'header',
  'footer',
  'logo',
  'drawer',
  'menu',
  'hamburger',
  'copyright',
  'page-overlay',
];

const blocksToCopy = [
  'button',
  'heading',
  'image',
  'link',
  'lists',
  'paragraph',
  'video',
  'example',
];

/**
 * Copies some blocks / components (see `blocksToCopy` && `componentsToCopy`) from eightshift-frontend-libs to the project.
 *
 * @param  {string} projectPath Path to the project, needed to figure out where to pull blocks from.
 * @return {Promise}
 */
const copyBlocks = async (projectPath) => {

  const sourcePath = join(projectPath, 'node_modules', '@eightshift', 'frontend-libs', 'blocks', 'init', 'src', 'Blocks');
  const targetPath = join(projectPath, 'src', 'Blocks');

  // Copy assets
  await copy(join(sourcePath, 'Assets'), join(targetPath, 'assets'));
  await copy(join(sourcePath, 'Wrapper'), join(targetPath, 'wrapper'));
  await copy(join(sourcePath, 'manifest.json'), join(targetPath, 'manifest.json'));

  // Copy only some blocks
  const foldersToCopy = [];
  for (const block of blocksToCopy) {
    const blockFolderSource = join(sourcePath, 'Custom', block);
    const blockFolderTarget = join(targetPath, 'Custom', block);

    if (!await pathExists(blockFolderSource)) { // eslint-disable-line no-await-in-loop
      throw new Error(`Trying to copy non-existent block: ${blockFolderSource}`);
    }

    foldersToCopy.push(copy(blockFolderSource, blockFolderTarget));
  }

  for (const component of componentsToCopy) {
    const componentFolderSource = join(sourcePath, 'Components', component);
    const componentFolderTarget = join(targetPath, 'Components', component);

    if (!await pathExists(componentFolderSource)) { // eslint-disable-line no-await-in-loop
      throw new Error(`Trying to copy non-existent component: ${componentFolderSource}`);
    }

    foldersToCopy.push(copy(componentFolderSource, componentFolderTarget));
  }

  return Promise.all(foldersToCopy);
};

module.exports = {
  copyBlocks,
};

