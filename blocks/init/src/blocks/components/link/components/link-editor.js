import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const LinkEditor = (props) => {
  const {
    blockClass,
    link: {
      title,
      styleColor,
    },
    onChangeTitle,
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
