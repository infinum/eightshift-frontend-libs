import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import { block as item } from '../heading/story';
import { Gutenberg, id, blockDetails, blockInnerBlocks } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Group',
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
    },
    clientId: id(),
    innerBlocks: blockInnerBlocks(item().props.blocks, 3),
    isValid: true,
    name: `eightshift-boilerplate/${manifest.blockName}`,
  },
];

export const block = () => (
  <Gutenberg blocks={blocks} />
);

