import { Gutenberg, blockDetails, hasWrapperDecorator } from 'EighshiftBlocksStorybookHelpers';
import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from '../manifest.json';
import readme from './readme.md';

export default {
  title: 'Blocks|Paragraph',
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
            paragraph: {
              content: 'Paragraph Content',
              styleAlign: manifest.attributes.paragraph.default.styleAlign,
              styleColor: manifest.attributes.paragraph.default.styleColor,
              styleSize: manifest.attributes.paragraph.default.styleSize,
              removeStyle: manifest.attributes.paragraph.default.removeStyle,
            },
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
