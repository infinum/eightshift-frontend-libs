import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const ParagraphEditor = (props) => {
    const {
        paragraph: {
            content,
            styleAlign,
            styleColor,
            styleSize,
        },
        blockClass,
        onChangeContent,
    } = props;

    const componentClass = 'paragraph';

    const paragraphClass = classnames(
        componentClass,
        `${componentClass}__color--${styleColor}`,
        `${componentClass}__align--${styleAlign}`,
        `${componentClass}__size--${styleSize}`,
        `${blockClass}__paragraph`,
);

  return (
    <RichText
      className={paragraphClass}
      placeholder={__('Add your paragraph', 'eightshift-boilerplate')}
      onChange={onChangeContent}
      value={content}
    />
  );
};
