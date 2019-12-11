import React from 'react'; // eslint-disable-line no-unused-vars
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ImageEditor } from './../../../components/image/components/image-editor';

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

  return (
    <div className={blockClass}>
      <div className={imageClass}>
        <ImageEditor
          blockClass={blockClass}
          url={mediaUrl}
        />
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
