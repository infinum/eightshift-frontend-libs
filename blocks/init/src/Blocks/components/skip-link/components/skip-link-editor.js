import React from 'react';
import { __ } from '@wordpress/i18n';
import { selector, checkAttr, classnames } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const SkipLinkEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const skipLinkTarget = checkAttr('skipLinkTarget', attributes, manifest);
	
	const skipLinkClasses = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	return (
		<a
			href={skipLinkTarget}
			className={skipLinkClasses}
		>
			{__('Skip to content', 'eightshift-frontend-libs')}
		</a>
	);
};
