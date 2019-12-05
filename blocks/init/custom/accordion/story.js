import React from 'react'; // eslint-disable-line no-unused-vars
import { withKnobs, boolean } from '@storybook/addon-knobs';

import manifest from './manifest.json';
import { block as item } from './../accordion-item/story';
import { Gutenberg, id, blockDetails, blockInnerBlocks } from './../../../../.storybook/helpers';


export default {
  title: 'Blocks|Accordion - NOT FINISHED',
  decorators: [withKnobs],
};

const label = 'Use Wrapper';
const defaultValue = true;

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      allowedBlocks: ['eightshift-boilerplate/carousel-item'],
    },
    clientId: id(),
    innerBlocks: blockInnerBlocks(item().props.blocks, 3),
    isValid: true,
    name: `eightshift-boilerplate/${manifest.blockName}`,
  },
];

console.log(boolean(label, defaultValue));


export const block = () => (
  <Gutenberg blocks={blocks} hasWrapper={boolean(label, defaultValue)} />
);

