import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';

export const TabsEditor = (props) => {
  const {
    attributes: {
      blockClass,
      blockJsClass,
      allowedBlocks,
    },
  } = props;

  const componentClass = `
    ${blockClass}
    ${blockJsClass}
  `;

  return (
    <div className={componentClass}>
      <InnerBlocks
        allowedBlocks={(typeof allowedBlocks === 'undefined') || allowedBlocks}
      />
    </div>
  );
};
