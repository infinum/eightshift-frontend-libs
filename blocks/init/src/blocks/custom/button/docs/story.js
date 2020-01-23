import { Gutenberg, blockDetails, hasWrapperDecorator } from 'EightshiftBlocksStorybookHelpers';
import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../manifest.json';
import readme from './readme.md';

export default {
  title: 'Blocks|Button',
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
            button: {
              title: 'Button Title',
              url: 'https://fakeurl.com/',
              styleSize: manifest.attributes.button.default.styleSize,
              styleColor: manifest.attributes.button.default.styleColor,
              styleSizeWidth: manifest.attributes.button.default.styleSizeWidth,
              id: '',
            },
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
          originalContent: '',
        },
      ],
    }
  } />
);
