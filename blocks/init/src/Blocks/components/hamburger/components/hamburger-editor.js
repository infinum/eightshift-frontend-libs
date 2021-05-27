import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const HamburgerEditor = (attributes) => {
	const {
		componentClass: manifestComponentClass,
	} = manifest;


	const {
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
	} = attributes;

	const hamburgerUse = checkAttr('hamburgerUse', attributes, manifest);

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
