import React from 'react'; // eslint-disable-line no-unused-vars
import { InnerBlocks } from '@wordpress/block-editor';

export const GroupEditor = ({ attributes }) => {
  const {
    blockClass,
    allowedBlocks,
  } = attributes;

  const blocksObject = (typeof allowedBlocks === 'undefined') || allowedBlocks;

  return (
    <div className={blockClass}>
      <InnerBlocks
        allowedBlocks={blocksObject}
      />
    </div>
  );
};
