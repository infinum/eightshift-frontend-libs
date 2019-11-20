import React from 'react';
import { RichText } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

export const ServiceBoxEditor = (props) => {
  const {
    attributes: {
      blockClass,
      title,
      content,
      mediaUrl,
    },
    actions: {
      onChangeTitle,
      onChangeContent,
    },
  } = props;

  const titleClass = `${blockClass}__title`;
  const contentClass = `${blockClass}__content`;
  const imageClass = `${blockClass}__image`;
  const imgClass = `${blockClass}__img`;

  return (
    <div className={blockClass}>
      <div className={imageClass}>
        <img src={mediaUrl} className={imgClass} alt="" />
      </div>
      <div className={titleClass}>
        <RichText
          placeholder={__('Add title', 'eightshift-boilerplate')}
          onChange={onChangeTitle}
          value={title}
        />
      </div>
      <div className={contentClass}>
        <RichText
          placeholder={__('Add content', 'eightshift-boilerplate')}
          onChange={onChangeContent}
          value={content}
        />
      </div>
    </div>
  );
};
