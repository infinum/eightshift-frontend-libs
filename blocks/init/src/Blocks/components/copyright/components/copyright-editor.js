import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const CopyrightEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const copyrightUse = checkAttr('copyrightUse', attributes, manifest);
	const copyrightBy = checkAttr('copyrightBy', attributes, manifest);
	const copyrightYear = checkAttr('copyrightYear', attributes, manifest) ?? new Date().getFullYear();
	const copyrightContent = checkAttr('copyrightContent', attributes, manifest);

	const copyrightClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	if (!copyrightUse) {
		return null;
	}

	return (
		<div className={copyrightClass}>
			&copy; {copyrightBy} {copyrightYear} - {copyrightContent}
		</div>
	);
};
