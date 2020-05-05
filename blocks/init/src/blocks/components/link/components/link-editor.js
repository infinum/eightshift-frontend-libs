import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const LinkEditor = ({ blockClass, link, props }) => {
  const {
    title,
    styleColor,
  } = link;

  const {
    onChangeTitle,
  } = props;

  const componentClass = 'link';

  const linkClass = classnames(
    componentClass,
    `${componentClass}__color--${styleColor}`,
    `${blockClass}__link`,
  );

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
