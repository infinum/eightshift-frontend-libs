import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from '../manifest.json';
import readme from './readme.md';
import { Gutenberg, blockDetails, hasWrapperDecorator } from 'EighshiftBlocksStorybookHelpers';

export default {
  title: 'Blocks|Card List',
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
            media: {
              id: 0,
              url: 'https://picsum.photos/1000/700',
              title: 'Card Title',
            },
            heading: 'Lorem ipsum dolor sit amet',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam est id semper aliquet. Aenean accumsan lacus justo, a lacinia turpis semper condimentum. ',
            mediaPosition: manifest.attributes.mediaPosition.default,
            button: {
              title: 'Button Title',
              url: 'https://fakeurl.com',
              styleSize: manifest.attributes.button.default.styleSize,
              styleColor: manifest.attributes.button.default.styleColor,
              styleSizeWidth: manifest.attributes.button.default.styleSizeWidth,
              id: 'ID',
            }
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
