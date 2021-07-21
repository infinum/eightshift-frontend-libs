import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ScrollToTopEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const scrollToTopUse = checkAttr('scrollToTopUse', attributes, manifest);
	const scrollToTopContent = checkAttr('scrollToTopContent', attributes, manifest);

	const scrollClass = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	return (
		<>
			{scrollToTopUse &&
				<button className={scrollClass}>
					{scrollToTopContent}
				</button>
			}
		</>
	);
};
