import React from 'react';
import { RichText, InnerBlocks } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

export const ServicesEditor = (props) => {
  const {
    attributes: {
      blockClass,
      allowedBlocks,
      title,
      number,
    },
    actions: {
      onChangeTitle,
      onChangeNumber,
    },
  } = props;

  const componentClass = `${blockClass}`;
  const introClass = `${blockClass}__intro`;
  const titleClass = `${blockClass}__title`;
  const numberClass = `${blockClass}__number`;
  const contentClass = `${blockClass}__content`;
  const contentWrapClass = `${blockClass}__content-wrap`;

  return (
    <div className={componentClass}>
      <div className={introClass}>
        <div className={numberClass}>
          <RichText
            placeholder={__('00', 'eightshift-boilerplate')}
            onChange={onChangeNumber}
            value={number}
          />
        </div>
        <div className={titleClass}>
          <RichText
            placeholder={__('Add title', 'eightshift-boilerplate')}
            onChange={onChangeTitle}
            value={title}
          />
        </div>
      </div>

      <div className={contentClass}>
        <div className={contentWrapClass}>
          <InnerBlocks
            allowedBlocks={(typeof allowedBlocks === 'undefined') || allowedBlocks}
          />
        </div>
      </div>
    </div>
  );
};
