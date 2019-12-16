import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../manifest.json';
import readme from './readme.md';
import { Gutenberg, blockDetails, hasWrapperDecorator } from '../../../../../.storybook/helpers';

export default {
  title: 'Blocks|Jumbotron',
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
            heading: 'Lorem ipsum dolor sit amet',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam est id semper aliquet. Aenean accumsan lacus justo, a lacinia turpis semper condimentum.',
            media: {
              id: 0,
              url: 'https://picsum.photos/1200/800',
              title: 'Carousel Image Title',
            },
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
