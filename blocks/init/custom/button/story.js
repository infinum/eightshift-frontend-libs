import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import { Gutenberg, id, blockDetails } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Button',
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      title: 'Button Title',
      url: 'https://fakeurl.com/',
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

export const block = () => (
  <Gutenberg blocks={blocks} />
);
