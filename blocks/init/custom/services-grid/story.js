import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import readme from './readme.md';
import { block as item } from './../service-box/story';
import { Gutenberg, blockDetails, blockInnerBlocks, hasWrapperDecorator } from './../../../../.storybook/helpers';

export default {
  title: 'Blocks|Services Grid',
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

export const block = () => (
  <Gutenberg props={
    {
      blocks: [
        {
          attributes: {
            ...blockDetails(manifest.blockName),
            allowedBlocks: ['eightshift-boilerplate/service-box'],
          },
          innerBlocks: blockInnerBlocks(item(), 8),
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
