import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ScrollToTopEditor = (attributes) => {
	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
	} = attributes;

	const scrollToTopUse = checkAttr('scrollToTopUse', attributes, manifest);
	const scrollToTopContent = checkAttr('scrollToTopContent', attributes, manifest);

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
