import React from 'react';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import { clsx } from '@eightshift/ui-components/utilities';
import manifest from './../manifest.json';

export const PageOverlayEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const pageOverlayUse = checkAttr('pageOverlayUse', attributes, manifest);

	const overlayClass = clsx(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	if (!pageOverlayUse) {
		return null;
	}

	return (
		<div className={overlayClass} />
	);
};
