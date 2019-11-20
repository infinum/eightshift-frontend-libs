import React from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/editor';

export const IntroEditor = (props) => {
  const {
    attributes: {
      blockClass,
      heading,
      paragraph,
      mediaUrl,
    },
    actions: {
      onChangeHeading,
      onChangeParagraph,
    },
  } = props;

  const imageClass = `${blockClass}__image`;
  const imgClass = `${blockClass}__img`;
  const wrapClass = `${blockClass}__wrap`;
  const headingClass = `${blockClass}__heading`;
  const contentClass = `${blockClass}__paragraph`;

  return (
    <div className={blockClass}>
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
      </div>

      <div className={imageClass}>
        <img className={imgClass} src={mediaUrl} alt="" />
      </div>
    </div>
  );
};
