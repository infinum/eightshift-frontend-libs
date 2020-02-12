const replace = require('replace-in-file');
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

  const sourcePath = join(projectPath, 'node_modules', '@eightshift', 'frontend-libs', 'blocks', 'init', 'src', 'blocks');
  const targetPath = join(projectPath, 'src', 'blocks');

  // Copy assets
  await copy(join(sourcePath, 'assets'), join(targetPath, 'assets'));
  await copy(join(sourcePath, 'wrapper'), join(targetPath, 'wrapper'));
  await copy(join(sourcePath, 'manifest.json'), join(targetPath, 'manifest.json'));

  // Copy only some blocks
  const foldersToCopy = [];
  for (const block of blocksToCopy) {
    const blockFolderSource = join(sourcePath, 'custom', block);
    const blockFolderTarget = join(targetPath, 'custom', block);

    if (!await pathExists(blockFolderSource)) { // eslint-disable-line no-await-in-loop
      throw new Error(`Trying to copy non-existent block: ${blockFolderSource}`);
    }

    foldersToCopy.push(copy(blockFolderSource, blockFolderTarget));
  }

  for (const component of componentsToCopy) {
    const componentFolderSource = join(sourcePath, 'components', component);
    const componentFolderTarget = join(targetPath, 'components', component);

    if (!await pathExists(componentFolderSource)) { // eslint-disable-line no-await-in-loop
      throw new Error(`Trying to copy non-existent component: ${componentFolderSource}`);
    }

    foldersToCopy.push(copy(componentFolderSource, componentFolderTarget));
  }

  return Promise.all(foldersToCopy);
};

/**
 * Removes block instantiation code from project.
 *
 * @param  {string} projectPath Path to the project, needed to figure out where to pull blocks from.
 * @return {Promise}
 */
const removeBlocksSupport = async (projectPath) => {
  const pathMainPhp = join(projectPath, 'src', 'class-main.php');

  if (!(await pathExists)) {
    throw Error('Missing class-main.php, unable to remove stuff from it.');
  }

  // All of these lines should be commented (prefixed with '// ').
  const thingsToComment = [
    'use Eightshift_Libs\\Blocks as Lib_Blocks',
    'Lib_Enqueue\\Enqueue_Blocks::class',
    'Lib_Blocks\\Blocks::class',
  ];

  for (const thing of thingsToComment) {

    // We can't do this in parallel because it's all happening in a single file.
    // eslint-disable-next-line no-await-in-loop
    await replace({
      files: pathMainPhp,
      from: thing,
      to: `// ${thing}`,
    });
  }
};

module.exports = {
  copyBlocks,
  removeBlocksSupport,
};

