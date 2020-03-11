/* eslint-disable no-unused-vars, import/no-extraneous-dependencies */

import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';

export const ColumnsEditor = (props) => {
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
