import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import { responsiveSelectors } from '@eightshift/frontend-libs/scripts/helpers';

export const WrapperEditor = (props) => {
  const {
    children,
    attributes: {
      hasWrapper,
      hasSimpleWrapper,
      disableWrapper,
      id,
      styleBackgroundColor,
      styleContentWidth,
      styleContentOffset,
      styleContainerWidth,
      styleContainerSpacing,
      styleSpacingTop,
      styleSpacingBottom,
    },
  } = props;

  const wrapperMainClass = 'wrapper';

  const wrapperClass = classnames(
    wrapperMainClass,
    `${styleBackgroundColor && `${wrapperMainClass}__bg-color--${styleBackgroundColor}`}`,

    `${responsiveSelectors(styleSpacingTop, 'spacing-top', wrapperMainClass)}`,
    `${responsiveSelectors(styleSpacingBottom, 'spacing-bottom', wrapperMainClass)}`,
  );

  const wrapperContainerClass = classnames(
    `${wrapperMainClass}__container`,
    `${styleBackgroundColor && `${wrapperMainClass}__bg-color--${styleBackgroundColor}`}`,

    `${responsiveSelectors(styleContainerWidth, 'container-width', wrapperMainClass)}`,
    `${responsiveSelectors(styleContainerSpacing, 'container-spacing', wrapperMainClass)}`,
  );

  const wrapperInnerClass = classnames(
    `${wrapperMainClass}__inner`,
    `${styleBackgroundColor && `${wrapperMainClass}__bg-color--${styleBackgroundColor}`}`,

    `${responsiveSelectors(styleContentWidth, 'inner-content-width', wrapperMainClass)}`,
    `${responsiveSelectors(styleContentOffset, 'inner-offset', wrapperMainClass)}`,
  );

  if (!hasWrapper) {
    return children;
  }

  return (
    <Fragment>
      {disableWrapper ?
        children :
        <div className={wrapperClass} id={id}>
          {hasSimpleWrapper ?
            children :
            <div className={wrapperContainerClass}>
              <div className={wrapperInnerClass}>
                {children}
              </div>
            </div>
          }
        </div>
      }
    </Fragment>
  );
};
