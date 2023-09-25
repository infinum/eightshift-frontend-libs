import React from 'react';
import { selector, checkAttr, classnames } from '@eightshift/frontend-libs/scripts';
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

	const scrollClass = classnames(
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
