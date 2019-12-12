import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import readme from './readme.md';
import { block as item } from '../card-list/story';
import { Gutenberg, blockDetails, blockInnerBlocks, hasWrapperDecorator } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Cards List',
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
            allowedBlocks: ['eightshift-boilerplate/card-list'],
          },
          innerBlocks: blockInnerBlocks(item(), 6),
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
