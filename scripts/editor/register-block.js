import { InnerBlocks } from '@wordpress/block-editor';
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
    namespace,
    blockName,
    title,
    description,
    category,
    keywords,
    parent,
    transforms,
    example,
    styles,
    supports,
    hasInnerBlocks = false,
    isInactive = false,
    hasWrapper = true,
  } = manifest;

  // If block is set to inactive it will not be register.
  if (isInactive === true) {
    return false;
  }

  let {
    icon,
  } = manifest;

  const {
    background: backgroundGlobal,
    foreground: foregroundGlobal,
  } = blocksSettings;

  // Default save method.
  let save = () => null;

  // Append globalManifest data in to output.
  icon = {
    background: (typeof icon.background === 'undefined') ? backgroundGlobal : icon.background,
    foreground: (typeof icon.background === 'undefined') ? foregroundGlobal : icon.foreground,
    src: icon.src,
  };

  // Provide different save method for InnerBlocks.
  if (hasInnerBlocks && typeof InnerBlocks !== 'undefined') {
    save = () => createElement(InnerBlocks.Content);
  }

  // Check if namespace is defined in block or in global manifest settings.
  const namespaceFinal = (typeof namespace === 'undefined') ? blocksSettings.namespace : namespace;

  return {
    blockName: `${namespaceFinal}/${blockName}`,
    options: {
      title,
      description,
      category,
      icon,
      keywords,
      supports,
      parent,
      transforms,
      example,
      styles,
      edit: (hasWrapper && wrapper !== null) ? withWrapper(edit, wrapper) : edit,
      save,
    },
  };
};
