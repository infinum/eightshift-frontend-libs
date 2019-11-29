import React from 'react'; // eslint-disable-line no-unused-vars
import { InnerBlocks } from '@wordpress/editor';

export const ServicesGridEditor = (props) => {
  const {
    attributes: {
      blockClass,
      allowedBlocks,
    },
  } = props;

  const contentClass = `${blockClass}__content`;

  return (
    <div className={blockClass}>
      <div className={contentClass}>
        <InnerBlocks
          allowedBlocks={(typeof allowedBlocks === 'undefined') || allowedBlocks}
        />
      </div>
    </div>
  );
};
