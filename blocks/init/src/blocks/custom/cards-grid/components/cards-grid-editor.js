import React from 'react'; // eslint-disable-line no-unused-vars
import { InnerBlocks } from '@wordpress/block-editor';

export const CardsGridEditor = (props) => {
  const {
    attributes: {
      blockClass,
      allowedBlocks,
    },
  } = props;

  return (
    <div className={blockClass}>
      <InnerBlocks
        allowedBlocks={(typeof allowedBlocks === 'undefined') || allowedBlocks}
      />
    </div>
  );
};
