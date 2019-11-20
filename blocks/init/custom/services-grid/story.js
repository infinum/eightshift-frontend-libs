import React from 'react';
import manifest from './manifest.json';
import { block as item } from './../service-box/story';
import { Gutenberg, id, blockDetails, blockInnerBlocks } from './../../../../.storybook/helpers'

export default {
  title: 'Blocks|Services Grid',
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      allowedBlocks: ['eightshift-boilerplate/service-box'],
    },
    clientId: id(),
    innerBlocks: blockInnerBlocks(item().props.blocks, 8),
    isValid: true,
    name: `eightshift-boilerplate/${manifest.blockName}`,
  },
];

export const block = () => (
  <Gutenberg blocks={blocks} />
);
