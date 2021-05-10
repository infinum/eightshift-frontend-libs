import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ScrollToTopEditor = (attributes) => {
	const {
		componentName: manifestComponentName,
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		componentName = manifestComponentName,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		scrollToTopUse = checkAttr('scrollToTopUse', attributes, manifest, componentName),

		scrollToTopContent = checkAttr('scrollToTopContent', attributes, manifest, componentName),

	} = attributes;

	const scrollClass = classnames(
		componentClass,
		selector(blockClass, blockClass, selectorClass),
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
