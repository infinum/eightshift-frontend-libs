import { registerBlockType } from '@wordpress/blocks';
import { registerBlock } from './register-block';

/**
 * Filter array of JavaScript paths and get the correct edit component.
 *
 * @param {string} blockName Provided block name to find corresponding edit component.
 * @param {function} paths Function of all JavaScript files in a block got from require.context.
 * @param {string} fileName Block partial name.
 *
 */
export const getBlockEditComponent = (blockName, paths, fileName) => {

  // Create an array of all blocks file paths.
  const pathsKeys = paths.keys();

  // Get Block edit component from block name and pathsKeys.
  const editComponent = pathsKeys.filter((filePath) => filePath === `./${blockName}/${blockName}--${fileName}.js`).map(paths)[0];

  // If edit component is missing throw and error.
  if (typeof editComponent === 'undefined') {
    throw Error(`It looks like you are missing block edit component for block: ${blockName}, please check if you have ${blockName}-block.js file in your block folder.`);
  }

  // No mater if class of functional component is used fetch the first item in an object.
  const editCallback = editComponent[Object.keys(editComponent)[0]];

  // If edit component callback is missing throw and error.
  if (typeof editCallback === 'undefined') {
    throw Error(`It looks like you are missing block edit component for block: ${blockName}, please check if you have ${blockName}-block.js file in your block folder.`);
  }

  return editCallback;
};

/**
 * Filter array of JavaScript paths and get the correct transforms component.
 *
 * @param {string} blockName Provided block name to find corresponding edit component.
 * @param {function} paths Function of all JavaScript files in a block got from require.context.
 * @param {string} fileName Block partial name.
 *
 */
export const getBlockGenericComponent = (blockName, paths, fileName) => {

  // Create an array of all blocks file paths.
  const pathsKeys = paths.keys();

  // Get Block edit component from block name and pathsKeys.
  const editComponent = pathsKeys.filter((filePath) => filePath === `./${blockName}/${blockName}-${fileName}.js`).map(paths)[0];

  // If edit component is missing throw and error.
  if (typeof editComponent === 'undefined') {
    return null;
  }

  // No mater if class of functional component is used fetch the first item in an object.
  return editComponent[Object.keys(editComponent)[0]];
};

/**
 * Register all Block Editor blocks using WP registerBlockType method.
 * Due to restrictions in dynamic import using dynamic names all block are register using require.context.
 *
 * @param {object} globalManifest Must provide global blocks setting manifest.json.
 * @param {function} wrapperComponent Wrapper callback function.
 * @param {object} wrapperManifest Wrapper manifest function.
 * @param {function} blocksManifestPath Must provide require.context for all blocks manifest.json-s.
 * @param {function} blocksPaths Must provide require.context for all blocks JavaScript files (unable to add only block edit file due to dynamic naming).
 * @param {function} hooksPath Function of hooks JavaScript files in a block got from require.context.
 * @param {function} variationsPath Function of variations JavaScript files in a block got from require.context.
 * @param {function} transformsPaths Function of transforms JavaScript files in a block got from require.context.
 * @param {function} iconsPath Function of icons JavaScript files in a block got from require.context.
 *
 */
export const registerBlocks = (
  globalManifest,
  wrapperComponent = null,
  wrapperManifest = {},
  blocksManifestPath,
  blocksPaths,
  hooksPath = null,
  variationsPath = null,
  transformsPaths = null,
  iconsPath = null
) => {

  // Create an array of Block manifests.
  const allBlocksManifestPath = blocksManifestPath.keys().map(blocksManifestPath);

  // Iterate blocks to register.
  allBlocksManifestPath.map((block) => {

    // Get Block edit component from block name and blocksPaths.
    const editCallback = getBlockEditComponent(block.blockName, blocksPaths, 'block');

    // Get Block Transforms component from block name and transformsPaths.
    if (transformsPaths !== null) {
      const transformsCallback = getBlockGenericComponent(block.blockName, transformsPaths, 'transforms');
  
      if (transformsCallback !== null) {
        block.transforms = transformsCallback;
      }
    }

    // Get Block Transforms component from block name and iconsPath.
    if (iconsPath !== null) {
      const iconsCallback = getBlockGenericComponent(block.blockName, iconsPath, 'icons');
  
      if (iconsCallback !== null) {
        if (!block.hasOwnProperty('icon')) {
          block.icon = Object.create(null);
        }

        block.icon.src = iconsCallback();
      }
    }

    // Get Block Variations component from block name and variationsPath.
    if (variationsPath !== null) {
      const variationsCallback = getBlockGenericComponent(block.blockName, variationsPath, 'variations');
  
      if (variationsCallback !== null) {
        variationsCallback();
      }
    }

    // Get Block Hooks component from block name and hooksPath.
    if (hooksPath !== null) {
      const hooksCallback = getBlockGenericComponent(block.blockName, hooksPath, 'hooks');

      if (hooksCallback !== null) {
        hooksCallback();
      }
    }

    // Pass data to registerBlock helper to get final output for registerBlockType.
    const blockDetails = registerBlock(
      block,
      globalManifest,
      editCallback,
      wrapperComponent,
      wrapperManifest
    );

    // Native WP method for block registration.
    registerBlockType(blockDetails.blockName, blockDetails.options);

    return null;
  });
};
