import React from 'react';
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const PageOverlayEditor = (attributes) => {
	const {
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		pageOverlayUse = checkAttr('pageOverlayUse', attributes, manifest, componentName),
	} = attributes;

	const overlayClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<Fragment>
			{pageOverlayUse &&
				<div className={overlayClass}></div>
			}
		</Fragment>
	);
};
