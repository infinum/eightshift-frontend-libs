import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from '../manifest.json';
import readme from './readme.md';
import { block as item } from '../../tabs-item/docs/story';
import { Gutenberg, blockDetails, blockInnerBlocks, hasWrapperDecorator } from 'EighshiftBlocksStorybookHelpers';

export default {
  title: 'NOT FINISHED Blocks|Tabs',
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
            allowedBlocks: ['eightshift-boilerplate/tabs-item-head'],
          },
          innerBlocks: blockInnerBlocks(item(), 3),
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);

export const test = () => (
  <div className="test">
    <div className="test__head">head</div>
    <div className="test__content">content</div>
    <div className="test__head">head</div>
    <div className="test__content">content</div>
    <div className="test__head">head</div>
    <div className="test__content">content</div>
    <div className="test__head">head</div>
    <div className="test__content">content</div>
  </div>
);
