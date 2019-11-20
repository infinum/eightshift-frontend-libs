import React from 'react';
import manifest from './manifest.json';
import { Gutenberg, id, blockDetails } from '../../../../.storybook/helpers'

export default {
  title: 'Initial Blocks|Paragraph',
};

export const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      content: 'Paragraph Content',
      styleAlign: manifest.attributes.styleAlign.default,
      styleColor: manifest.attributes.styleColor.default,
      styleSize: manifest.attributes.styleSize.default,
      removeStyle: manifest.attributes.removeStyle.default,
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
