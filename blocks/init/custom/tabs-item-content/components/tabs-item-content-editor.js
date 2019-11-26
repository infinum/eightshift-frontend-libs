import React from 'react';
import { RichText } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

export const TabsItemContentEditor = (props) => {
  const {
    attributes: {
      blockClass,
      id,
      content,
    },
    actions: {
      onChangeContent,
    },
  } = props;

  return (
    <div className={blockClass} data-tab={id}>
      <div className={`${blockClass}__content`}>
        <RichText
          placeholder={__('Add content', 'eightshift-boilerplate')}
          onChange={onChangeContent}
          value={content}
        />
      </div>
    </div>
  );
};
