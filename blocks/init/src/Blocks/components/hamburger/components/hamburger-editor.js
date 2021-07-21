import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
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
	} = attributes;

	const hamburgerUse = checkAttr('hamburgerUse', attributes, manifest);

	const hamburgerClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
		selector(componentJsClass, componentJsClass),
	]);

	return (
		<>
			{hamburgerUse &&
				<button className={hamburgerClass}>
					<span className={`${componentClass}__wrap`}>
						<span className={`${componentClass}__line ${componentClass}__line--1`}></span>
						<span className={`${componentClass}__line ${componentClass}__line--2`}></span>
						<span className={`${componentClass}__line ${componentClass}__line--3`}></span>
					</span>
				</button>
			}
		</>
	);
};
