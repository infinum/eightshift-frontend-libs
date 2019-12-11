import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

import { ButtonEditor } from './../../../components/button/components/button-editor';
import { ImageEditor } from './../../../components/image/components/image-editor';

export const ImageTextEditor = (props) => {
  const {
    attributes: {
      blockClass,
      heading,
      paragraph,
      imagePosition,
      mediaUrl,
      buttonStyleSize,
      buttonStyleSizeWidth,
      buttonStyleColor,
      buttonIcon,
      buttonTitle,
      styleFullHeight,
    },
    actions: {
      onChangeHeading,
      onChangeParagraph,
    },
  } = props;

  const componentClass = `
    ${blockClass}
    ${blockClass}__media-position--${imagePosition}
    ${blockClass}__full-height--${styleFullHeight}
  `;
  const mediaWrapClass = `${blockClass}__media-wrap`;
  const wrapClass = `${blockClass}__content-wrap`;
  const headingClass = `${blockClass}__heading`;
  const contentClass = `${blockClass}__paragraph`;

  return (
    <div className={componentClass}>
      <div className={mediaWrapClass}>
        <ImageEditor
          blockClass={blockClass}
          url={mediaUrl}
        />
      </div>
      <div className={wrapClass}>
        <div className={headingClass}>
          <RichText
            placeholder={__('Add your heading', 'eightshift-boilerplate')}
            onChange={onChangeHeading}
            value={heading}
          />
        </div>
        <div className={contentClass}>
          <RichText
            placeholder={__('Add your paragraph', 'eightshift-boilerplate')}
            onChange={onChangeParagraph}
            value={paragraph}
          />
        </div>
        <ButtonEditor
          blockClass={blockClass}
          styleColor={buttonStyleColor}
          styleSize={buttonStyleSize}
          styleSizeWidth={buttonStyleSizeWidth}
          icon={buttonIcon}
          title={buttonTitle}
        />
      </div>
    </div>
  );
};
