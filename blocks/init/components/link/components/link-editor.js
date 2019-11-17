import React from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/editor';

export const LinkEditor = (props) => {
  const {
    blockClass,
    title,
    onChangeTitle,
    styleColor,
  } = props;

  const componentClass = 'link';

  const linkClass = `
    ${componentClass}
    ${componentClass}__color--${styleColor}
    ${blockClass}__link
  `;

  return (
    <RichText
      placeholder={__('Add Link Title', 'eightshift-boilerplate')}
      value={title}
      onChange={onChangeTitle}
      className={linkClass}
      keepPlaceholderOnFocus
    />
  );
};
