import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import readme from './readme.md';
import { Gutenberg, blockDetails, hasWrapperDecorator } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Intro',
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
              title: 'Image Text Title',
            },
            heading: 'Heading',
            paragraph: 'Paragraph Content',
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
