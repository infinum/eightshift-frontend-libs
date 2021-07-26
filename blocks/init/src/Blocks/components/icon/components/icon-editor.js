import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const IconEditor = (attributes) => {
	const {
		componentClass,
		icons: manifestIcons,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const iconUse = checkAttr('iconUse', attributes, manifest);
	const iconName = checkAttr('iconName', attributes, manifest);

	const iconClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	if (!iconUse) {
		return null;
	}

	return (
		<i className={iconClass} dangerouslySetInnerHTML={{ __html: manifestIcons[iconName] }}></i>
	);
};
