import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import { Gutenberg, id, blockDetails } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Heading',
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
  <Gutenberg blocks={blocks} />
);
