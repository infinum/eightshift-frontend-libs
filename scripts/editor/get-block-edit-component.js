/**
 * Filter array of javascript paths and get the correct edit component.
 *
 * @param {string} blockName Provided block name to find corresponding edit component.
 * @param {object} blocksFilePathsKeys Array of all javascript files in a block.
 *
 */
export const getBlockEditComponent = (blockName, blocksFilePathsKeys) => {
  return blocksFilePathsKeys.filter((filePath) => filePath === `./${blockName}/${blockName}-block.js`);
};
