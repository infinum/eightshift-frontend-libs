import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import readme from './readme.md';
import { Gutenberg, id, blockDetails, hasWrapperDecorator } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Quote',
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
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
  <Gutenberg props={{ blocks }} />
);
