import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import { block as item } from '../tabs-item/story';
import { Gutenberg, id, blockDetails, blockInnerBlocks, hasWrapperDecorator } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Tabs - NOT FINISHED',
  ...hasWrapperDecorator(manifest),
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      allowedBlocks: ['eightshift-boilerplate/tabs-item-head'],
    },
    clientId: id(),
    innerBlocks: blockInnerBlocks(item(), 3),
    isValid: true,
    name: `eightshift-boilerplate/${manifest.blockName}`,
  },
];

export const block = () => (
  <Gutenberg props={{ blocks }} />
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
