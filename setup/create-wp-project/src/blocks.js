const { join } = require('path');
const { copy, pathExists } = require('fs-extra');

const blocksToCopy = [
  {
    name: 'button',
    componentDependencies: [{ name: 'button' }],
  },
  {
    name: 'example',
    componentDependencies: [],
  },
  {
    name: 'group',
    componentDependencies: [],
  },
  {
    name: 'heading',
    componentDependencies: [{ name: 'heading' }],
  },
  {
    name: 'image',
    componentDependencies: [{ name: 'image' }],
  },
  {
    name: 'link',
    componentDependencies: [{ name: 'link' }],
  },
  {
    name: 'lists',
    componentDependencies: [{ name: 'lists' }],
  },
  {
    name: 'paragraph',
    componentDependencies: [{ name: 'paragraph' }],
  },
  {
    name: 'video',
    componentDependencies: [{ name: 'video' }],
  },
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
    const blockFolderSource = join(sourcePath, 'custom', block.name);
    const blockFolderTarget = join(targetPath, 'custom', block.name);

    if (!await pathExists(blockFolderSource)) { // eslint-disable-line no-await-in-loop
      throw new Error(`Trying to copy non-existent block: ${blockFolderSource}`);
    }

    fileToCopy.push(copy(blockFolderSource, blockFolderTarget));

    for (const blockDependency of block.componentDependencies) {
      const blockDependencyFolderSource = join(sourcePath, 'components', blockDependency.name);
      const blockDependencyFolderTarget = join(targetPath, 'components', blockDependency.name);

      if (!await pathExists(blockDependencyFolderSource)) { // eslint-disable-line no-await-in-loop
        throw new Error(`Trying to copy non-existent component: ${blockDependencyFolderSource}`);
      }

      fileToCopy.push(copy(blockDependencyFolderSource, blockDependencyFolderTarget));
    }
  }

  return Promise.all(fileToCopy);
};

module.exports = {
  copyBlocksFolder,
};

