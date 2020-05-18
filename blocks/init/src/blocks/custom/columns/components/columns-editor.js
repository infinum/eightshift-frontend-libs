/* eslint-disable no-unused-vars, import/no-extraneous-dependencies */

import React from 'react';
import classnames from 'classnames';
import { responsiveSelectors } from '@eightshift/frontend-libs/scripts/helpers';
import { InnerBlocks } from '@wordpress/block-editor';

export const ColumnsEditor = ({ attributes }) => {
  const {
    allowedBlocks,
    blockClass,
    gutter,
    horizontalSpacing,
  } = attributes;

  const componentClass = classnames(
    blockClass,
    'eightshift-block',
    `${responsiveSelectors(gutter, 'gutter', blockClass)}`,
    `${responsiveSelectors(horizontalSpacing, 'horizontal-spacing', blockClass)}`,
  );

  return (
    <div className={componentClass}>
      <InnerBlocks
        allowedBlocks={(typeof allowedBlocks === 'undefined') || allowedBlocks}
      />
    </div>
  );
};
