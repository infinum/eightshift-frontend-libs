import React from 'react'; // eslint-disable-line no-unused-vars
import { InnerBlocks } from '@wordpress/editor';

export const GroupEditor = (props) => {
  const {
    attributes: {
      blockClass,
    },
  } = props;

  return (
    <div className={blockClass}>
      <InnerBlocks />
    </div>
  );
};
