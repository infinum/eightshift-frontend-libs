import React from 'react';
import manifest from './manifest.json';
import { Gutenberg, id, blockDetails } from '../../../../.storybook/helpers'

export default {
  title: 'Blocks|Service Box',
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      mediaId: '',
      mediaUrl: '',
      mediaSize: manifest.attributes.mediaSize.default,
      title: 'Box title',
      content: 'Box content',
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
