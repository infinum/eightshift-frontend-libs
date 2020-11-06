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

		wrapperOffsetLarge,
		wrapperOffsetDesktop,
		wrapperOffsetTablet,
		wrapperOffsetMobile,

		wrapperWidthLarge,
		wrapperWidthDesktop,
		wrapperWidthTablet,
		wrapperWidthMobile,

		wrapperGutterLarge,
		wrapperGutterDesktop,
		wrapperGutterTablet,
		wrapperGutterMobile,

		wrapperContainerWidthLarge,
		wrapperContainerWidthDesktop,
		wrapperContainerWidthTablet,
		wrapperContainerWidthMobile,

		wrapperSpacingTopLarge,
		wrapperSpacingTopDesktop,
		wrapperSpacingTopTablet,
		wrapperSpacingTopMobile,

		wrapperSpacingBottomLarge,
		wrapperSpacingBottomDesktop,
		wrapperSpacingBottomTablet,
		wrapperSpacingBottomMobile,

		wrapperDividerTopLarge,
		wrapperDividerTopDesktop,
		wrapperDividerTopTablet,
		wrapperDividerTopMobile,

		wrapperDividerBottomLarge,
		wrapperDividerBottomDesktop,
		wrapperDividerBottomTablet,
		wrapperDividerBottomMobile,
	} = attributes;

	if (!wrapperUse || wrapperDisable) {
		return children;
	}

	const wrapperSpacingTop = {
		large: wrapperSpacingTopLarge,
		desktop: wrapperSpacingTopDesktop,
		tablet: wrapperSpacingTopTablet,
		mobile: wrapperSpacingTopMobile,
	};

	const wrapperSpacingBottom = {
		large: wrapperSpacingBottomLarge,
		desktop: wrapperSpacingBottomDesktop,
		tablet: wrapperSpacingBottomTablet,
		mobile: wrapperSpacingBottomMobile,
	};

	const wrapperDividerTop = {
		large: wrapperDividerTopLarge,
		desktop: wrapperDividerTopDesktop,
		tablet: wrapperDividerTopTablet,
		mobile: wrapperDividerTopMobile,
	};

	const wrapperDividerBottom = {
		large: wrapperDividerBottomLarge,
		desktop: wrapperDividerBottomDesktop,
		tablet: wrapperDividerBottomTablet,
		mobile: wrapperDividerBottomMobile,
	};

	const wrapperContainerWidth = {
		large: wrapperContainerWidthLarge,
		desktop: wrapperContainerWidthDesktop,
		tablet: wrapperContainerWidthTablet,
		mobile: wrapperContainerWidthMobile,
	};

	const wrapperGutter = {
		large: wrapperGutterLarge,
		desktop: wrapperGutterDesktop,
		tablet: wrapperGutterTablet,
		mobile: wrapperGutterMobile,
	};

	const wrapperWidth = {
		large: wrapperWidthLarge,
		desktop: wrapperWidthDesktop,
		tablet: wrapperWidthTablet,
		mobile: wrapperWidthMobile,
	};

	const wrapperOffset = {
		large: wrapperOffsetLarge,
		desktop: wrapperOffsetDesktop,
		tablet: wrapperOffsetTablet,
		mobile: wrapperOffsetMobile,
	};

	const wrapperMainClass = 'wrap';

	const wrapperClass = classnames(
		wrapperMainClass,
		`${wrapperBackgroundColor && `${wrapperMainClass}__bg-color--${wrapperBackgroundColor}`}`,
		`${responsiveSelectors(wrapperSpacingTop, 'spacing-top', wrapperMainClass)}`,
		`${responsiveSelectors(wrapperSpacingBottom, 'spacing-bottom', wrapperMainClass)}`,
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
