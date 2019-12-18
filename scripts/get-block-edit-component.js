/**
 * Filter array of javascript paths and get the correct edit component.
 *
 * @param {string} blockName Provided block name to find coresponding edit component.
 * @param {object} blocksFilePathsKeys Array of all javascript files in a block.
 *
 * @since 1.0.4 Moving to scripts folder.
 * @since 1.0.0
 */
export const getBlockEditComponent = (blockName, blocksFilePathsKeys) => {
  return blocksFilePathsKeys.filter((filePath) => filePath === `./${blockName}/${blockName}-block.js`);
};
