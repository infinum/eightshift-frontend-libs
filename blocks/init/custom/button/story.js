import React from 'react';
import manifest from './manifest.json';
import { Gutenberg, id, blockDetails } from '../../../../.storybook/helpers'

export default {
  title: 'Initial Blocks|Button',
};

export const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      title: 'Button Title',
      url: 'http://dev.infinum.co/',
      styleSize: manifest.attributes.styleSize.default,
      styleColor: manifest.attributes.styleColor.default,
      styleSizeWidth: manifest.attributes.styleSizeWidth.default,
      btnId: '',
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
