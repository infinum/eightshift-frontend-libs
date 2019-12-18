import React from 'react'; // eslint-disable-line no-unused-vars
import { RichText } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

export const QuoteEditor = (props) => {
  const {
    attributes: {
      blockClass,
      author,
      content,
    },
    actions: {
      onChangeAuthor,
      onChangeContent,
    },
  } = props;

  return (
    <div className={blockClass}>
      <div className={`${blockClass}__content`}>
        <RichText
          placeholder={__('Add quote text', 'eightshift-boilerplate')}
          onChange={onChangeContent}
          value={content}
        />
      </div>
      <div className={`${blockClass}__clear`}></div>
      <div className={`${blockClass}__author`}>
        <RichText
          placeholder={__('Add author', 'eightshift-boilerplate')}
          onChange={onChangeAuthor}
          value={author}
        />
      </div>
    </div>
  );
};
