/* eslint-disable no-unused-vars */

import React from 'react';
import { assign } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose';
import manifest from './manifest.json';
import globalManifest from './../../manifest.json';

const parentComponentBlock = createHigherOrderComponent((BlockListBlock) => {
  return (innerProps) => {
    const {
      name,
      attributes: {
        blockClass,
      },
    } = innerProps;

    let updatedProps = innerProps;

    if (name === `${globalManifest.namespace}/${manifest.blockName}`) {
      const componentClass = blockClass;

      updatedProps = assign(
        {},
        innerProps,
        {
          className: componentClass,
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
