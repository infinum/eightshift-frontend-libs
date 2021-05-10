import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const HamburgerEditor = (attributes) => {
	const {
		componentName: manifestComponentName,
		componentClass: manifestComponentClass,
	} = manifest;


	const {
		componentName = manifestComponentName,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		hamburgerUse = checkAttr('hamburgerUse', attributes, manifest, componentName),
	} = attributes;

	const hamburgerClass = classnames([
		componentClass,
		selector(componentClass, `js-${componentClass}`),
		selector(blockClass, blockClass, selectorClass),
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
