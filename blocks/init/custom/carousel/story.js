import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import readme from './readme.md';
import { block as item } from './../carousel-image/story';
import { Gutenberg, id, blockDetails, blockInnerBlocks, hasWrapperDecorator } from './../../../../.storybook/helpers';

export default {
  title: 'Blocks|Carousel',
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      allowedBlocks: ['eightshift-boilerplate/carousel-image'],
      isFreeMode: manifest.attributes.isFreeMode.default,
      isLoop: manifest.attributes.isLoop.default,
    },
    clientId: id(),
    innerBlocks: blockInnerBlocks(item(), 3),
    isValid: true,
    name: `eightshift-boilerplate/${manifest.blockName}`,
  },
];

export const block = () => (
  <Gutenberg props={{ blocks }} />
);

