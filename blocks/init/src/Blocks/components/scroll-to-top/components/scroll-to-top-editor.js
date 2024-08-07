import React from 'react';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import { clsx } from '@eightshift/ui-components/utilities';
import manifest from './../manifest.json';

export const ScrollToTopEditor = (attributes) => {
	const {
		componentClass,
		resources: manifestResources,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const scrollToTopUse = checkAttr('scrollToTopUse', attributes, manifest);

	const scrollClass = clsx(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	if (!scrollToTopUse) {
		return null;
	}

	return (
		<button className={scrollClass}>
			<i dangerouslySetInnerHTML={{ __html: manifestResources.icon }} />
		</button>
	);
};
