import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../manifest.json';
import readme from './readme.md';
import { Gutenberg, blockDetails, hasWrapperDecorator } from '../../../../../.storybook/helpers';

export default {
  title: 'Blocks|Lists Info',
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

export const block = () => (
  <Gutenberg props={
    {
      blocks: [
        {
          attributes: {
            ...blockDetails(manifest.blockName),
            title: 'Intro Title',
            content: '<li>List Item 1</li><li>List Item 2</li><li>List Item 3</li>',
            ordered: manifest.attributes.ordered.default,
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
