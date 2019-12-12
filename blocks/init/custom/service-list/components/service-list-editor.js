import React from 'react'; // eslint-disable-line no-unused-vars
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ImageEditor } from '../../../components/image/components/image-editor';

export const ServiceListEditor = (props) => {
  const {
    attributes: {
      blockClass,
      title,
      content,
      media,
    },
    actions: {
      onChangeTitle,
      onChangeContent,
    },
  } = props;

  return (
    <div className={blockClass}>
      <div className={`${blockClass}__image`}>
        <ImageEditor
          blockClass={blockClass}
          media={media}
        />
      </div>
      <div className={`${blockClass}__wrap`}>
        <div className={`${blockClass}__title`}>
          <RichText
            placeholder={__('Add title', 'eightshift-boilerplate')}
            onChange={onChangeTitle}
            value={title}
          />
        </div>
        <div className={`${blockClass}__content`}>
          <RichText
            placeholder={__('Add content', 'eightshift-boilerplate')}
            onChange={onChangeContent}
            value={content}
          />
        </div>
      </div>
    </div>
  );
};
