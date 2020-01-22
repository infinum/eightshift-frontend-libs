import { Gutenberg, blockDetails, hasWrapperDecorator } from 'EighshiftBlocksStorybookHelpers';
import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from '../manifest.json';
import readme from './readme.md';

export default {
  title: 'Blocks|Card',
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
              url: 'https://picsum.photos/400/400',
              title: 'Card Title',
            },
            heading: 'Lorem ipsum dolor sit amet',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam est id semper aliquet. Aenean accumsan lacus justo, a lacinia turpis semper condimentum. ',
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
