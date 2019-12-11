import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import readme from './readme.md';
import { Gutenberg, id, blockDetails, hasWrapperDecorator } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Heading',
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      content: 'Heading Content',
      level: manifest.attributes.level.default,
      styleAlign: manifest.attributes.styleAlign.default,
      styleColor: manifest.attributes.styleColor.default,
      styleSize: manifest.attributes.styleSize.default,
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
