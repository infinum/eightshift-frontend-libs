import React from 'react';
import manifest from './manifest.json';
import { blocks as item } from '../heading/story';
import { Gutenberg, id, blockDetails, blockInnerBlocks } from '../../../../.storybook/helpers'

export default {
  title: 'Initial Blocks|Group',
};

export const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
    },
    clientId: id(),
    innerBlocks: blockInnerBlocks(item, 3),
    isValid: true,
    name: 'eightshift-boilerplate/carousel',
  },
];

export const defaultBlock = () => (
  <Gutenberg blocks={blocks} />
);

