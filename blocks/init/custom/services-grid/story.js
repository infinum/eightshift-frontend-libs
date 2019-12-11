import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import readme from './readme.md';
import { block as item } from './../service-box/story';
import { Gutenberg, id, blockDetails, blockInnerBlocks, hasWrapperDecorator } from './../../../../.storybook/helpers';

export default {
  title: 'Blocks|Services Grid',
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      allowedBlocks: ['eightshift-boilerplate/service-box'],
    },
    clientId: id(),
    innerBlocks: blockInnerBlocks(item(), 8),
    isValid: true,
    name: `eightshift-boilerplate/${manifest.blockName}`,
  },
];

export const block = () => (
  <Gutenberg props={{ blocks }} />
);
