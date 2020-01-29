import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { ImageEditor } from './../../../components/image/components/image-editor';

export const JumbotronEditor = (props) => {
  const {
    attributes: {
      blockClass,
      heading,
      paragraph,
      media,
      contentHorizontalPosition,
      contentVerticalPosition,
      mediaHorizontalPosition,
    },
    actions: {
      onChangeHeading,
      onChangeParagraph,
    },
  } = props;

  return (
    <div className={blockClass}>
      <div className={`
        ${blockClass}__media
        ${blockClass}__media--horizontal-${mediaHorizontalPosition}
      `}>
        <ImageEditor
          blockClass={blockClass}
          media={media}
        />
      </div>

      <div className={`
        ${blockClass}__content
        ${blockClass}__content--vertical-${contentVerticalPosition}
        ${blockClass}__content--horizontal-${contentHorizontalPosition}
      `}>
        <div className={`${blockClass}__content-wrap`}>
          <div className={`${blockClass}__heading`}>
            <RichText
              placeholder={__('Add Heading', 'eightshift-boilerplate')}
              className={`${blockClass}__heading`}
              onChange={onChangeHeading}
              value={heading}
            />
          </div>
          
          <div className={`${blockClass}__paragraph`}>
            <RichText
              placeholder={__('Add Paragraph', 'eightshift-boilerplate')}
              className={`${blockClass}__paragraph`}
              onChange={onChangeParagraph}
              value={paragraph}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
