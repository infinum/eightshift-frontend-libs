import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';

export const ButtonEditor = (props) => {
  const {
    blockClass,
    title,
    styleSize,
    styleColor,
    styleSizeWidth,
  } = props;

  const componentClass = 'btn';

  const buttonClass = `
    ${componentClass}
    ${componentClass}__size--${styleSize}
    ${componentClass}__color--${styleColor}
    ${componentClass}__size-width--${styleSizeWidth}
    ${blockClass}__btn
  `;

  return (
    <Fragment>
      {title && (
        <div className={buttonClass}>{title}</div>
      )}
    </Fragment>
  );
};
