import { Gutenberg, blockDetails, hasWrapperDecorator } from 'EighshiftBlocksStorybookHelpers';
import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../manifest.json';
import readme from './readme.md';

export default {
  title: 'Blocks|Link',
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
            link: {
              title: 'Link Title',
              url: 'https://fakeurl.com',
              styleColor: manifest.attributes.link.default.styleColor,
              isAnchor: manifest.attributes.link.default.isAnchor,
            },
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
