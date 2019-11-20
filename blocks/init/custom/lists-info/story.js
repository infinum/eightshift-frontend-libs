import React from 'react';
import manifest from './manifest.json';
import { Gutenberg, id, blockDetails } from '../../../../.storybook/helpers'

export default {
  title: 'Blocks|Lists Info',
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      title: 'Intro Title',
      content: '<li>List Item 1</li><li>List Item 2</li><li>List Item 3</li>',
      ordered: manifest.attributes.ordered.default,
    },
    clientId: id(),
    innerBlocks: [],
    isValid: true,
    name: `eightshift-boilerplate/${manifest.blockName}`,
  },
];

export const block = () => (
  <Gutenberg blocks={blocks} />
);
