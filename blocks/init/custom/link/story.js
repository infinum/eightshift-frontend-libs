import React from 'react';
import manifest from './manifest.json';
import { Gutenberg, id, blockDetails } from '../../../../.storybook/helpers'

export default {
  title: 'Initial Blocks|Link',
};

export const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      title: 'Link Title',
      url: '',
      styleColor: manifest.attributes.styleColor.default,
      isAnchor: manifest.attributes.isAnchor.default,
    },
    clientId: id(),
    innerBlocks: [],
    isValid: true,
    name: `eightshift-boilerplate/${manifest.blockName}`,
    originalContent: '',
  },
];

export const defaultBlock = () => (
  <Gutenberg blocks={blocks} />
);
