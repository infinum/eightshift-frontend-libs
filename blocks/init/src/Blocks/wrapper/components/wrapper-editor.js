import React from 'react';
import classnames from 'classnames';
import { responsiveSelectors, selector, checkAttr, checkAttrResponsive } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const WrapperEditor = ({ attributes, children }) => {
	const wrapperUse = checkAttr('wrapperUse', attributes, manifest);
	const wrapperUseSimple = checkAttr('wrapperUseSimple', attributes, manifest);
	const wrapperDisable = checkAttr('wrapperDisable', attributes, manifest);
	const wrapperId = checkAttr('wrapperId', attributes, manifest);
	const wrapperBackgroundColor = checkAttr('wrapperBackgroundColor', attributes, manifest);
	const wrapperParentClass = checkAttr('wrapperParentClass', attributes, manifest);
	const className = checkAttr('className', attributes, manifest);

	if (!wrapperUse || wrapperDisable) {
		return children;
	}

	if (!wrapperUse || wrapperDisable) {
		if (!wrapperParentClass) {
			return children;
		}

		const wrapperParentClassItemClass = selector(wrapperParentClass, wrapperParentClass, 'item');
		const wrapperParentClassItemInnerClass = selector(wrapperParentClass, wrapperParentClass, 'item-inner');

		return (
			<div className={wrapperParentClassItemClass}>
				<div className={wrapperParentClassItemInnerClass}>
					{children}
				</div>
			</div>
		);
	}

	const wrapperSpacingTop = checkAttrResponsive('wrapperSpacingTop', attributes, manifest);
	const wrapperSpacingBottom = checkAttrResponsive('wrapperSpacingBottom', attributes, manifest);
	const wrapperSpacingTopIn = checkAttrResponsive('wrapperSpacingTopIn', attributes, manifest);
	const wrapperSpacingBottomIn = checkAttrResponsive('wrapperSpacingBottomIn', attributes, manifest);
	const wrapperDividerTop = checkAttrResponsive('wrapperDividerTop', attributes, manifest);
	const wrapperDividerBottom = checkAttrResponsive('wrapperDividerBottom', attributes, manifest);
	const wrapperContainerWidth = checkAttrResponsive('wrapperContainerWidth', attributes, manifest);
	const wrapperGutter = checkAttrResponsive('wrapperGutter', attributes, manifest);
	const wrapperWidth = checkAttrResponsive('wrapperWidth', attributes, manifest);
	const wrapperOffset = checkAttrResponsive('wrapperOffset', attributes, manifest);
	const wrapperHide = checkAttrResponsive('wrapperHide', attributes, manifest);

	const wrapperMainClass = 'wrapper';

	const wrapperClass = classnames([
		wrapperMainClass,
		selector(wrapperMainClass, wrapperMainClass, 'bg-color', wrapperBackgroundColor),
		responsiveSelectors(wrapperSpacingTop, 'spacing-top', wrapperMainClass),
		responsiveSelectors(wrapperSpacingBottom, 'spacing-bottom', wrapperMainClass),
		responsiveSelectors(wrapperSpacingTopIn, 'spacing-top-in', wrapperMainClass),
		responsiveSelectors(wrapperSpacingBottomIn, 'spacing-bottom-in', wrapperMainClass),
		responsiveSelectors(wrapperDividerTop, 'divider-top', wrapperMainClass, false),
		responsiveSelectors(wrapperDividerBottom, 'divider-bottom', wrapperMainClass, false),
		responsiveSelectors(wrapperHide, 'hide-editor', wrapperMainClass, false),
		className,
	]);

	const wrapperContainerClass = classnames([
		`${wrapperMainClass}__container`,
		responsiveSelectors(wrapperContainerWidth, 'container-width', wrapperMainClass),
		responsiveSelectors(wrapperGutter, 'gutter', wrapperMainClass),
	]);

	const wrapperInnerClass = classnames([
		`${wrapperMainClass}__inner`,
		responsiveSelectors(wrapperWidth, 'width', wrapperMainClass),
		responsiveSelectors(wrapperOffset, 'offset', wrapperMainClass),
	]);

	return (
		<div className={wrapperClass} id={wrapperId}>
			{wrapperUseSimple && children}
			{!wrapperUseSimple &&
				<div className={wrapperContainerClass}>
					<div className={wrapperInnerClass}>
						{children}
					</div>
				</div>
			}
		</div>
	);
};
