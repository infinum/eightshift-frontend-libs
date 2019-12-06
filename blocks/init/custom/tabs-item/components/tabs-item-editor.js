import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export const TabsItemEditor = (props) => {
  const {
    attributes: {
      blockClass,
      head,
      content,
    },
    actions: {
      onChangeContent,
    },
  } = props;

  return (
    <Fragment>
      <div className={`${blockClass}__head`}>
        {head}
      </div>
      <div className={`${blockClass}__content`}>
        <RichText
          placeholder={__('Add content', 'eightshift-boilerplate')}
          onChange={onChangeContent}
          value={content}
        />
      </div>
    </Fragment>
  );
};
