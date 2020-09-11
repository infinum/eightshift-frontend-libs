/* eslint-disable no-unused-vars */

import React from './node_modules/react';
import { assign } from './node_modules/lodash';
import { createHigherOrderComponent } from './node_modules/@wordpress/compose';
import globalManifest from '../manifest.json';

// Add options to the Gutenberg markup.
const parentComponentBlock = createHigherOrderComponent((BlockListBlock) => {
  return (innerProps) => {
    const {
      name,
    } = innerProps;

    let updatedProps = innerProps;

    if (name.split('/')[0] === globalManifest.namespace) {
      updatedProps = assign(
        {},
        innerProps,
        {
          className: globalManifest.globalVariables.customBlocksName,
        }
      );
    }

    return wp.element.createElement(
      BlockListBlock,
      updatedProps
    );
  };
}, 'parentComponentBlock');

export const hooks = () => {
  wp.hooks.addFilter('editor.BlockListBlock', globalManifest.namespace, parentComponentBlock);
};
