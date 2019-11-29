import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import { Gutenberg, id, blockDetails } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Quote',
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      author: 'Narcotics Anonymous',
      content: 'Insanity is doing the same thing, over and over again, but expecting different results.',
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
