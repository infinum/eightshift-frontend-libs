import React from 'react';
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

  const authorClass = `${blockClass}__author`;
  const contentClass = `${blockClass}__content`;

  return (
    <div className={blockClass}>
      <div className={contentClass}>
        <RichText
          placeholder={__('Add quote text', 'eightshift-boilerplate')}
          onChange={onChangeContent}
          value={content}
        />
      </div>
      <div className={authorClass}>
        <RichText
          placeholder={__('Add author', 'eightshift-boilerplate')}
          onChange={onChangeAuthor}
          value={author}
        />
      </div>
    </div>
  );
};
