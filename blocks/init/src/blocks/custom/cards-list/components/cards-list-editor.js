import React from 'react'; // eslint-disable-line no-unused-vars
import { InnerBlocks } from '@wordpress/block-editor';

export const CardsListEditor = ({ attributes }) => {
  const {
    blockClass,
    allowedBlocks,
  } = attributes;

  return (
    <div className={blockClass}>
      <InnerBlocks
        allowedBlocks={(typeof allowedBlocks === 'undefined') || allowedBlocks}
      />
    </div>
  );
};
