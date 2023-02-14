import React from 'react';
import { __ } from '@wordpress/i18n';
import { selector, checkAttr, classnames } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ShareEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,

	} = attributes;

	const shareUse = checkAttr('shareUse', attributes, manifest);

	const shareClass = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	const shareItemClass = classnames(
		selector(componentClass, componentClass, 'item'),
		selector(blockClass, blockClass, 'item'),
	);

	if (!shareUse) {
		return null;
	}

	return (
		<div className={shareClass}>
			{__('Share on', 'eightshift-frontend-libs')}
			{manifest.socialOptions.map(({ label }, key) => (
				<div key={key} className={shareItemClass}>{label}</div>
			))}
		</div>
	);
};
