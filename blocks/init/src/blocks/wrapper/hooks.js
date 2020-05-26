/* eslint-disable no-unused-vars */

import React from 'react';
import { assign } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose';
import globalManifest from './../manifest.json';

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
          className: 'eightshift-block',
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
