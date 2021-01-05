import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ScrollToTopEditor = (attributes) => {
	const {
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
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
		<Fragment>
			{scrollToTopUse &&
				<button className={scrollClass}>
					{scrollToTopContent}
				</button>
			}
		</Fragment>
	);
};
