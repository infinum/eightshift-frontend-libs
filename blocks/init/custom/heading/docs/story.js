import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from '../manifest.json';
import readme from './readme.md';
import { Gutenberg, blockDetails, hasWrapperDecorator } from 'EighshiftBlocksStorybookHelpers';

export default {
  title: 'Blocks|Heading',
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
            heading: {
              content: 'Heading Content',
              styleAlign: manifest.attributes.heading.default.styleAlign,
              styleColor: manifest.attributes.heading.default.styleColor,
              styleSize: manifest.attributes.heading.default.styleSize,
            },
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
