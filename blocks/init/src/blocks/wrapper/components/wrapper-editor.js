import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { responsiveSelectors } from '@eightshift/frontend-libs/scripts/helpers';

export const WrapperEditor = (props) => {
  const {
    children,
    attributes: {
      hasWrapper,
      id,
      styleBackgroundColor,
  
      styleContentWidth,
      styleContentOffset,
      styleContainerWidth,
      styleContainerSpacing,
      styleSpacingTop,
      styleSpacingBottom,
      styleHideBlock,
    },
  } = props;

  const wrapperMainClass = 'wrapper';

  const wrapperClass = classnames(
    wrapperMainClass,
    `${styleBackgroundColor && `${wrapperMainClass}__bg-color--${styleBackgroundColor}`}`,

    `${responsiveSelectors(styleSpacingTop, 'spacing-top', wrapperMainClass)}`,
    `${responsiveSelectors(styleSpacingBottom, 'spacing-bottom', wrapperMainClass)}`,
    `${responsiveSelectors(styleHideBlock, 'hide-block', wrapperMainClass, true)}`,
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
    <div className={wrapperClass} id={id}>
      <div className={wrapperContainerClass}>
        <div className={wrapperInnerClass}>
          {children}
        </div>
      </div>
    </div>
  );
};
