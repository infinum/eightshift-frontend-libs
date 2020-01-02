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

const copyBlocksFolder = async (projectPath) => {

  const sourcePath = join(projectPath, 'node_modules', '@eightshift', 'frontend-libs', 'blocks', 'init');
  const targetPath = join(projectPath, 'src', 'blocks');

  // Copy assets
  await copy(join(sourcePath, 'assets'), join(targetPath, 'assets'));
  await copy(join(sourcePath, 'layout'), join(targetPath, 'layout'));
  await copy(join(sourcePath, 'wrapper'), join(targetPath, 'wrapper'));
  await copy(join(sourcePath, 'manifest.json'), join(targetPath, 'manifest.json'));

  // Copy only some blocks
  const fileToCopy = [];
  for (const block of blocksToCopy) {
    const blockFolderSource = join(sourcePath, 'custom', block);
    const blockFolderTarget = join(targetPath, 'custom', block);

    if (!await pathExists(blockFolderSource)) { // eslint-disable-line no-await-in-loop
      throw new Error(`Trying to copy non-existent block: ${blockFolderSource}`);
    }

    fileToCopy.push(copy(blockFolderSource, blockFolderTarget));
  }

  for (const component of componentsToCopy) {
    const componentFolderSource = join(sourcePath, 'components', component);
    const componentFolderTarget = join(targetPath, 'components', component);

    if (!await pathExists(componentFolderSource)) { // eslint-disable-line no-await-in-loop
      throw new Error(`Trying to copy non-existent component: ${componentFolderSource}`);
    }

    fileToCopy.push(copy(componentFolderSource, componentFolderTarget));
  }

  return Promise.all(fileToCopy);
};

module.exports = {
  copyBlocksFolder,
};

