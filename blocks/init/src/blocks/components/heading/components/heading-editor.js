import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const HeadingEditor = (props) => {
  const {
    blockClass,
    heading: {
      content,
      styleAlign,
      styleColor,
      styleSize,
    },
    onChangeContent,
  } = props;

  const componentClass = 'heading';

  const headingClass = `
    ${componentClass}
    ${componentClass}__align--${styleAlign}
    ${componentClass}__color--${styleColor}
    ${componentClass}__size--${styleSize}
    ${blockClass}__heading
  `;

  return (
    <RichText
      className={headingClass}
      placeholder={__('Add your heading', 'eightshift-boilerplate')}
      onChange={onChangeContent}
      value={content}
    />
  );
};
