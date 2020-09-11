import React from './node_modules/react'; // eslint-disable-line no-unused-vars
import classnames from './node_modules/classnames';
import { responsiveSelectors } from './node_modules/@eightshift/frontend-libs/scripts/helpers';

export const WrapperEditor = (props) => {
  const {
    children,
    attributes: {
      wrapperUse,
      wrapperUseSimple,
      wrapperDisable,
      wrapperId,
      wrapperBackgroundColor,
      wrapperWidth,
      wrapperOffset,
      wrapperContainerWidth,
      wrapperGutter,
      wrapperSpacingTop,
      wrapperSpacingBottom,
    },
  } = props;

  if (!wrapperUse || wrapperDisable) {
    return children;
  }

  const wrapperMainClass = 'wrapper';

  const wrapperClass = classnames(
    wrapperMainClass,
    `${wrapperBackgroundColor && `${wrapperMainClass}__bg-color--${wrapperBackgroundColor}`}`,
    `${responsiveSelectors(wrapperSpacingTop, 'spacing-top', wrapperMainClass)}`,
    `${responsiveSelectors(wrapperSpacingBottom, 'spacing-bottom', wrapperMainClass)}`,
  );

  const wrapperContainerClass = classnames(
    `${wrapperMainClass}__container`,
    `${responsiveSelectors(wrapperContainerWidth, 'container-width', wrapperMainClass)}`,
    `${responsiveSelectors(wrapperGutter, 'gutter', wrapperMainClass)}`,
  );

  const wrapperInnerClass = classnames(
    `${wrapperMainClass}__inner`,
    `${responsiveSelectors(wrapperWidth, 'width', wrapperMainClass)}`,
    `${responsiveSelectors(wrapperOffset, 'offset', wrapperMainClass)}`,
  );

  if (!wrapperUse) {
    return children;
  }

  return (
    <div className={wrapperClass} id={wrapperId}>
      {wrapperUseSimple ?
        children :
        <div className={wrapperContainerClass}>
          <div className={wrapperInnerClass}>
            {children}
          </div>
        </div>
      }
    </div>
  );
};
