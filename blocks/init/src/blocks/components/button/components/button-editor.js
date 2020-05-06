import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';

export const ButtonEditor = ({ blockClass, button }) => {
  const {
    title,
    styleSize,
    styleColor,
    styleSizeWidth,
  } = button;

  const componentClass = 'btn';

  const buttonClass = classnames(
    componentClass,
    `${componentClass}__size--${styleSize}`,
    `${componentClass}__color--${styleColor}`,
    `${componentClass}__size-width--${styleSizeWidth}`,
    `${blockClass}__btn`,
  );

  return (
    <Fragment>
      {title && (
        <div className={buttonClass}>{title}</div>
      )}
    </Fragment>
  );
};
