import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const ParagraphEditor = (props) => {
  const {
    blockClass,
    paragraph: {
      content,
      styleAlign,
      styleColor,
      styleSize,
      removeStyle,
    },
    onChangeContent,
  } = props;

  const componentClass = 'paragraph';

  const paragraphClass = `
    ${componentClass}
    ${componentClass}__color--${styleColor}
    ${componentClass}__align--${styleAlign}
    ${componentClass}__size--${styleSize}
    ${blockClass}__paragraph
  `;

  return (
    <RichText
      className={removeStyle ? '' : paragraphClass}
      placeholder={__('Add your paragraph', 'eightshift-boilerplate')}
      onChange={onChangeContent}
      value={content}
    />
  );
};
