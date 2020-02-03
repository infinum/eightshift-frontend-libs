import { Gutenberg, blockDetails, blockInnerBlocks, hasWrapperDecorator } from 'EightshiftBlocksStorybookHelpers';
import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from '../manifest.json';
import readme from './readme.md';
import { block as item } from '../../carousel-image/docs/story';

export default {
  title: 'Blocks|Carousel',
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
            allowedBlocks: ['eightshift-boilerplate/carousel-image'],
            isFreeMode: manifest.attributes.isFreeMode.default,
            isLoop: manifest.attributes.isLoop.default,
          },
          innerBlocks: blockInnerBlocks(item(), 3),
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);

