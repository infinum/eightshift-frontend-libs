import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const HamburgerEditor = (attributes) => {
	const {
		componentClass,
		componentJsClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
		onClick,
	} = attributes;

	const hamburgerUse = checkAttr('hamburgerUse', attributes, manifest);

	const hamburgerClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
		selector(componentJsClass, componentJsClass),
	]);

	const iconClass = selector(componentClass, componentClass, 'icon');
	const iconBorderClass = selector(componentClass, componentClass, 'icon', 'border');
	const iconTopClass = selector(componentClass, componentClass, 'icon', 'top');
	const iconMidClass = selector(componentClass, componentClass, 'icon', 'mid');
	const iconBtmClass = selector(componentClass, componentClass, 'icon', 'btm');

	if (!hamburgerUse) {
		return null;
	}

	return (
		<button className={hamburgerClass} onClick={onClick}>
			<svg className={iconClass} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect className={iconBorderClass} opacity="0.1" x="1.23071" y="1.23077" width="29.5385" height="29.5385" rx="1.5" stroke="black" />
				<path className={iconTopClass} d="M7.38464 9.84616H24.6154" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path className={iconMidClass} d="M7.38464 16H24.6154" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path className={iconBtmClass} d="M7.38464 22.1538H24.6154" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</button>
	);
};
