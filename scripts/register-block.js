import { InnerBlocks } from '@wordpress/editor';
import { createElement } from '@wordpress/element';
import { withWrapper } from './with-wrapper';

/**
 * Map and prepare all options from block manifest.json file for usage in registerBlockType method.
 *
 * @param {object} manifest Block manifest.json object with data.
 * @param {object} blocksSettings Blocks  manifest.json object with data.
 * @param {function} edit Edit callback function.
 * @param {function} wrapper Wrapper callback function.
 *
 * @since 1.0.4 Moving to scripts folder.
 * @since 1.0.0
 */
export const registerBlock = (manifest, blocksSettings, edit, wrapper = null) => {
  const {
    blockName,
    title,
    description,
    category,
    keywords,
    supports,
    parent,
    hasInnerBlocks = false,
    isInactive = false,
    hasWrapper = true,
  } = manifest;

  // If block is set to inactive it will not be registrated.
  if (isInactive === true) {
    return false;
  }

  let {
    icon,
  } = manifest;

  const {
    namespace,
    background: backgroundGlobal,
  } = blocksSettings;

  // Default save method.
  let save = () => null;

  // Append globalManifest data in to output.
  icon = {
    background: (typeof icon.background === 'undefined') ? backgroundGlobal : icon.background,
    src: icon.src,
  };

  // Provide different save method for InnerBlocks.
  if (hasInnerBlocks && typeof InnerBlocks !== 'undefined') {
    save = () => createElement(InnerBlocks.Content);
  }

  return {
    blockName: `${namespace}/${blockName}`,
    options: {
      title,
      description,
      category,
      icon,
      keywords,
      supports,
      parent,
      edit: (hasWrapper && wrapper !== null) ? withWrapper(edit, wrapper) : edit,
      save,
    },
  };
};
