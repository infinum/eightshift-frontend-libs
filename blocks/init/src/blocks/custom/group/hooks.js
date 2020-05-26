/* eslint-disable no-unused-vars */

import React from 'react';
import { assign } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose';
import { select } from '@wordpress/data';
import manifest from './manifest.json';
import globalManifest from './../../manifest.json';

// Add options to the Gutenberg markup.
const parentComponentBlock = createHigherOrderComponent((BlockListBlock) => {
  return (innerProps) => {
    const {
      attributes,
      rootClientId,
    } = innerProps;

    let updatedProps = innerProps;

    // Remove wrapper from all blocks inside column block.
    const parent = select('core/block-editor').getBlocksByClientId(rootClientId);

    if (parent[0] !== null && parent[0].name === `${globalManifest.namespace}/${manifest.blockName}`) {
      updatedProps = assign(
        {},
        innerProps,
        {
          attributes: {
            ...attributes,
            wrapperUseSimple: true,
            wrapperUseSimpleShowControl: false,
          },
        }
      );

    }

    return wp.element.createElement(
      BlockListBlock,
      updatedProps
    );
  };
}, 'parentComponentBlock');

export const Hooks = () => {
  wp.hooks.addFilter('editor.BlockListBlock', globalManifest.namespace, parentComponentBlock);
};
