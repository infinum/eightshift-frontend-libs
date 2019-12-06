import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import { Gutenberg, id, blockDetails, hasWrapperDecorator } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Button',
  ...hasWrapperDecorator(manifest),
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
  <Gutenberg props={{ blocks }} />
);
