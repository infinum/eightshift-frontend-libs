import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import readme from './readme.md';
import { Gutenberg, id, blockDetails, hasWrapperDecorator } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Link',
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

const blocks = [
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
  },
];

export const block = () => (
  <Gutenberg props={{ blocks }} />
);
