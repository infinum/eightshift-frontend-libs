import React from 'react'; // eslint-disable-line no-unused-vars
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
      <div className={`${blockClass}__head`}>
        <InnerBlocks
          allowedBlocks={(typeof allowedBlocks === 'undefined') || allowedBlocks}
        />
      </div>
    </div>
  );
};
