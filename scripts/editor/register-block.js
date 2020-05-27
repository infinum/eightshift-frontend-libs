/* eslint-disable no-unused-vars */

import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element';

/**
 * Return shared attributes.
 *
 * @param {string} blockName Block name, simple or with namespace.
 * @param {string} namespace Namespace for full block name.
 */
export const getSharedAttributes = (blockName, namespace) => {
  return {
    blockName: {
      type: 'string',
      default: blockName,
    },
    blockFullName: {
      type: 'string',
      default: `${namespace}/${blockName}`,
    },
    blockClass: {
      type: 'string',
      default: `block-${blockName}`,
    },
    blockJsClass: {
      type: 'string',
      default: `js-block-${blockName}`,
    },
  };
};

/**
 * Wrap edit component with wrapper component.
 *
 * @param {function} Component Children callback function.
 * @param {function} Wrapper Wrapper callback function.
 *
 */
export const withWrapper = (Component, Wrapper) => (props) => {
  return (
    <Wrapper props={props}>
      <Component {...props} />
    </Wrapper>
  );
};

/**
 * Map and prepare all options from block manifest.json file for usage in registerBlockType method.
 *
 * @param {object} manifest Block manifest.json object with data.
 * @param {object} globalManifest Global blocks manifest.json object with namespace.
 * @param {function} edit Edit callback function.
 * @param {function} wrapper Wrapper callback function.
 *
 */
export const registerBlock = (
  manifest = {},
  globalManifest = {},
  edit,
  wrapperComponent,
  wrapperManifest,
) => {
  const {
    namespace,
    blockName,
    title,
    description,
    category,
    keywords,
    parent,
    transforms,
    example = {},
    styles,
    supports,
    hasInnerBlocks = false,
    isInactive = false,
    attributes = {},
    variations = [],
  } = manifest;

  // If block is set to inactive it will not be register.
  if (isInactive === true) {
    return false;
  }

  let {
    icon,
  } = manifest;

  const {
    namespace: namespaceGlobal,
    attributes: attributesGlobal,
    background: backgroundGlobal,
    foreground: foregroundGlobal,
  } = globalManifest;

  const {
    attributes: attributesWrapper,
  } = wrapperManifest;

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
  const namespaceFinal = (typeof namespace === 'undefined') ? namespaceGlobal : namespace;

  const finalAttributes = {
    ...getSharedAttributes(blockName, namespaceFinal),
    ...((typeof attributesGlobal === 'undefined') ? {} : attributesGlobal),
    ...((typeof attributesWrapper === 'undefined') ? {} : attributesWrapper),
    ...attributes,
  };

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
      attributes: finalAttributes,
      variations,
      edit: withWrapper(edit, wrapperComponent),
      save,
    },
  };
};
