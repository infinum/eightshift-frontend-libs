import React from 'react'; // eslint-disable-line no-unused-vars
import { InnerBlocks } from '@wordpress/editor';

export const AccordionEditor = (props) => {
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
