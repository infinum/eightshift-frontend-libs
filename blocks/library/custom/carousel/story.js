import React from 'react';
import manifest from './manifest.json';
import { blocks as item } from '../carousel-image/story';
import { Gutenberg, id, blockDetails, blockInnerBlocks } from '../../../../.storybook/helpers'

export default {
  title: 'Blocks|Carousel',
};

export const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      allowedBlocks: ['eightshift-boilerplate/carousel-image'],
      isFreeMode: manifest.attributes.isFreeMode.default,
      isLoop: manifest.attributes.isLoop.default,
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

