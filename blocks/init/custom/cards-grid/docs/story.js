import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from '../manifest.json';
import readme from './readme.md';
import { block as item } from '../../card/docs/story';
import { Gutenberg, blockDetails, blockInnerBlocks, hasWrapperDecorator } from 'EighshiftBlocksStorybookHelpers';

export default {
  title: 'Blocks|Cards Grid',
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
            allowedBlocks: ['eightshift-boilerplate/card'],
          },
          innerBlocks: blockInnerBlocks(item(), 6),
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
