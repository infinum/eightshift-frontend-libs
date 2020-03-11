/* eslint-disable no-unused-vars */

import React from 'react';
import { assign } from 'lodash';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

// Add options to the Gutenberg markup.
const parentComponentBlock = wp.compose.createHigherOrderComponent((BlockListBlock) => {
  return (innerProps) => {
    const {
      name,
      attributes: {
        blockClass,

        // Large.
        widthLarge,
        offsetLarge,

        // Desktop.
        widthDesktop,
        offsetDesktop,

        // Tablet.
        widthTablet,
        offsetTablet,

        // Mobile.
        widthMobile,
        offsetMobile,
      },
    } = innerProps;

    let updatedProps = innerProps;

    if (name === `${globalManifest.namespace}/${manifest.blockName}`) {
      const componentClass = `
        ${blockClass}

        ${widthLarge && `${blockClass}__width-large--${widthLarge}`}
        ${offsetLarge && `${blockClass}__offset-large--${offsetLarge}`}

        ${widthDesktop && `${blockClass}__width-desktop--${widthDesktop}`}
        ${offsetDesktop && `${blockClass}__offset-desktop--${offsetDesktop}`}

        ${widthTablet && `${blockClass}__width-tablet--${widthTablet}`}
        ${offsetTablet && `${blockClass}__offset-tablet--${offsetTablet}`}

        ${widthMobile && `${blockClass}__width-mobile--${widthMobile}`}
        ${offsetMobile && `${blockClass}__offset-mobile--${offsetMobile}`}
      `;

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

wp.hooks.addFilter('editor.BlockListBlock', globalManifest.namespace, parentComponentBlock);
