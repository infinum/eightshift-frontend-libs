import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const LoaderEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const loaderUse = checkAttr('loaderUse', attributes, manifest);
	const loaderUseOverlay = checkAttr('loaderUseOverlay', attributes, manifest);

	const loaderClass = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
		selector(loaderUseOverlay, componentClass, '', 'use-overlay'),
	);

	if (!loaderUse) {
		return null;
	}

	return (
		<div className={loaderClass} dangerouslySetInnerHTML={{ __html: manifest.resources.loader }}></div>
	);
};
