import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { responsiveSelectors } from '@eightshift/frontend-libs/scripts/helpers';

export const WrapperEditor = ({ attributes, children }) => {
	const {
		wrapperUse,
		wrapperUseSimple,
		wrapperDisable,
		wrapperId,
		wrapperBackgroundColor,
	} = attributes;

	if (!wrapperUse || wrapperDisable) {
		return children;
	}

	const wrapperSpacingTop = {
		large: attributes.wrapperSpacingTopLarge,
		desktop: attributes.wrapperSpacingTopDesktop,
		tablet: attributes.wrapperSpacingTopTablet,
		mobile: attributes.wrapperSpacingTopMobile,
	};

	const wrapperSpacingBottom = {
		large: attributes.wrapperSpacingBottomLarge,
		desktop: attributes.wrapperSpacingBottomDesktop,
		tablet: attributes.wrapperSpacingBottomTablet,
		mobile: attributes.wrapperSpacingBottomMobile,
	};

	const wrapperSpacingTopIn = {
		large: attributes.wrapperSpacingTopInLarge,
		desktop: attributes.wrapperSpacingTopInDesktop,
		tablet: attributes.wrapperSpacingTopInTablet,
		mobile: attributes.wrapperSpacingTopInMobile,
	};

	const wrapperSpacingBottomIn = {
		large: attributes.wrapperSpacingBottomInLarge,
		desktop: attributes.wrapperSpacingBottomInDesktop,
		tablet: attributes.wrapperSpacingBottomInTablet,
		mobile: attributes.wrapperSpacingBottomInMobile,
	};

	const wrapperDividerTop = {
		large: attributes.wrapperDividerTopLarge,
		desktop: attributes.wrapperDividerTopDesktop,
		tablet: attributes.wrapperDividerTopTablet,
		mobile: attributes.wrapperDividerTopMobile,
	};

	const wrapperDividerBottom = {
		large: attributes.wrapperDividerBottomLarge,
		desktop: attributes.wrapperDividerBottomDesktop,
		tablet: attributes.wrapperDividerBottomTablet,
		mobile: attributes.wrapperDividerBottomMobile,
	};

	const wrapperContainerWidth = {
		large: attributes.wrapperContainerWidthLarge,
		desktop: attributes.wrapperContainerWidthDesktop,
		tablet: attributes.wrapperContainerWidthTablet,
		mobile: attributes.wrapperContainerWidthMobile,
	};

	const wrapperGutter = {
		large: attributes.wrapperGutterLarge,
		desktop: attributes.wrapperGutterDesktop,
		tablet: attributes.wrapperGutterTablet,
		mobile: attributes.wrapperGutterMobile,
	};

	const wrapperWidth = {
		large: attributes.wrapperWidthLarge,
		desktop: attributes.wrapperWidthDesktop,
		tablet: attributes.wrapperWidthTablet,
		mobile: attributes.wrapperWidthMobile,
	};

	const wrapperOffset = {
		large: attributes.wrapperOffsetLarge,
		desktop: attributes.wrapperOffsetDesktop,
		tablet: attributes.wrapperOffsetTablet,
		mobile: attributes.wrapperOffsetMobile,
	};

	const wrapperMainClass = 'wrap';

	const wrapperClass = classnames(
		wrapperMainClass,
		`${wrapperBackgroundColor && `${wrapperMainClass}__bg-color--${wrapperBackgroundColor}`}`,
		`${responsiveSelectors(wrapperSpacingTop, 'spacing-top', wrapperMainClass)}`,
		`${responsiveSelectors(wrapperSpacingBottom, 'spacing-bottom', wrapperMainClass)}`,
		`${responsiveSelectors(wrapperSpacingTopIn, 'spacing-in-top', wrapperMainClass)}`,
		`${responsiveSelectors(wrapperSpacingBottomIn, 'spacing-in-bottom', wrapperMainClass)}`,
		`${responsiveSelectors(wrapperDividerTop, 'divider-top', wrapperMainClass, false)}`,
		`${responsiveSelectors(wrapperDividerBottom, 'divider-bottom', wrapperMainClass, false)}`,
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
