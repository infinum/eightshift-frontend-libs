import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import { Gutenberg, id, blockDetails } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Carousel Image',
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      mediaId: '',
      mediaUrl: manifest.attributes.mediaUrl.default,
      mediaSize: manifest.attributes.mediaSize.default,
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
