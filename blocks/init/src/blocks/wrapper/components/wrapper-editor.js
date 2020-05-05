import React from 'react'; // eslint-disable-line no-unused-vars

export const WrapperEditor = ({ children, attributes }) => {
  const {
    id,
    styleBackgroundColor,

    styleContentWidthLarge,
    styleContentOffsetLarge,
    styleContainerWidthLarge,
    styleContainerSpacingLarge,
    styleSpacingTopLarge,
    styleSpacingBottomLarge,

    styleContentWidthDesktop,
    styleContentOffsetDesktop,
    styleContainerWidthDesktop,
    styleContainerSpacingDesktop,
    styleSpacingTopDesktop,
    styleSpacingBottomDesktop,

    styleContentWidthTablet,
    styleContentOffsetTablet,
    styleContainerWidthTablet,
    styleContainerSpacingTablet,
    styleSpacingTopTablet,
    styleSpacingBottomTablet,

    styleContentWidthMobile,
    styleContentOffsetMobile,
    styleContainerWidthMobile,
    styleContainerSpacingMobile,
    styleSpacingTopMobile,
    styleSpacingBottomMobile,
  } = attributes;

  const wrapperMainClass = 'wrapper';

  const wrapperClass = `
    ${wrapperMainClass}
    ${styleBackgroundColor && `${wrapperMainClass}__bg-color--${styleBackgroundColor}`}

    // Large.
    ${styleSpacingTopLarge && `${wrapperMainClass}__spacing-top-large--${styleSpacingTopLarge}`}
    ${styleSpacingBottomLarge && `${wrapperMainClass}__spacing-bottom-large--${styleSpacingBottomLarge}`}

    // Desktop.
    ${styleSpacingTopDesktop && `${wrapperMainClass}__spacing-top-desktop--${styleSpacingTopDesktop}`}
    ${styleSpacingBottomDesktop && `${wrapperMainClass}__spacing-bottom-desktop--${styleSpacingBottomDesktop}`}

    // Tablet.
    ${styleSpacingTopTablet && `${wrapperMainClass}__spacing-top-tablet--${styleSpacingTopTablet}`}
    ${styleSpacingBottomTablet && `${wrapperMainClass}__spacing-bottom-tablet--${styleSpacingBottomTablet}`}

    // Mobile.
    ${styleSpacingTopMobile && `${wrapperMainClass}__spacing-top-mobile--${styleSpacingTopMobile}`}
    ${styleSpacingBottomMobile && `${wrapperMainClass}__spacing-bottom-mobile--${styleSpacingBottomMobile}`}
  `;

  const wrapperContainerClass = `
    ${wrapperMainClass}__container

    // Large.
    ${styleContainerWidthLarge && `${wrapperMainClass}__container-width-large--${styleContainerWidthLarge}`}
    ${styleContainerSpacingLarge && `${wrapperMainClass}__container-spacing-large--${styleContainerSpacingLarge}`}

    // Desktop.
    ${styleContainerWidthDesktop && `${wrapperMainClass}__container-width-desktop--${styleContainerWidthDesktop}`}
    ${styleContainerSpacingDesktop && `${wrapperMainClass}__container-spacing-desktop--${styleContainerSpacingDesktop}`}

    // Tablet.
    ${styleContainerWidthTablet && `${wrapperMainClass}__container-width-tablet--${styleContainerWidthTablet}`}
    ${styleContainerSpacingTablet && `${wrapperMainClass}__container-spacing-tablet--${styleContainerSpacingTablet}`}

    // Mobile.
    ${styleContainerWidthMobile && `${wrapperMainClass}__container-width-mobile--${styleContainerWidthMobile}`}
    ${styleContainerSpacingMobile && `${wrapperMainClass}__container-spacing-mobile--${styleContainerSpacingMobile}`}
  `;

  const wrapperInnerClass = `
    ${wrapperMainClass}__inner

    // Large.
    ${styleContentWidthLarge && `${wrapperMainClass}__inner-content-width-large--${styleContentWidthLarge}`}
    ${styleContentOffsetLarge && `${wrapperMainClass}__inner-offset-large--${styleContentOffsetLarge}`}

    // Desktop.
    ${styleContentWidthDesktop && `${wrapperMainClass}__inner-content-width-desktop--${styleContentWidthDesktop}`}
    ${styleContentOffsetDesktop && `${wrapperMainClass}__inner-offset-desktop--${styleContentOffsetDesktop}`}

    // Tablet.
    ${styleContentWidthTablet && `${wrapperMainClass}__inner-content-width-tablet--${styleContentWidthTablet}`}
    ${styleContentOffsetTablet && `${wrapperMainClass}__inner-offset-tablet--${styleContentOffsetTablet}`}

    // Mobile.
    ${styleContentWidthMobile && `${wrapperMainClass}__inner-content-width-mobile--${styleContentWidthMobile}`}
    ${styleContentOffsetMobile && `${wrapperMainClass}__inner-offset-mobile--${styleContentOffsetMobile}`}
  `;

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
