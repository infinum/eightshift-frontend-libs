import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import readme from './readme.md';
import { Gutenberg, blockDetails, hasWrapperDecorator } from '../../../../.storybook/helpers';

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
            title: 'Button Title',
            url: 'https://fakeurl.com/',
            styleSize: manifest.attributes.styleSize.default,
            styleColor: manifest.attributes.styleColor.default,
            styleSizeWidth: manifest.attributes.styleSizeWidth.default,
            btnId: '',
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
          originalContent: '',
        },
      ],
    }
  } />
);
