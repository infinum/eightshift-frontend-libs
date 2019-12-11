import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import readme from './readme.md';
import { Gutenberg, id, blockDetails, hasWrapperDecorator } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Service Box',
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      mediaId: '',
      mediaUrl: manifest.attributes.mediaUrl.default,
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
  <Gutenberg props={{ blocks }} />
);
