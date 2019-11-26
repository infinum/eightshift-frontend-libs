import React from 'react';
import { RichText } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

export const TabsItemHeadEditor = (props) => {
  const {
    attributes: {
      blockClass,
      id,
      title,
    },
    actions: {
      onChangeTitle,
    },
  } = props;

  return (
    <div className={blockClass} data-tab={id}>
      <div className={`${blockClass}__head`}>
        <RichText
          placeholder={__('Add title', 'eightshift-boilerplate')}
          onChange={onChangeTitle}
          value={title}
        />
      </div>
    </div>
  );
};
