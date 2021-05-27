import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const PageOverlayEditor = (attributes) => {
	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		pageOverlayUse = checkAttr('pageOverlayUse', attributes, manifest),
	} = attributes;

	const overlayClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{pageOverlayUse &&
				<div className={overlayClass}></div>
			}
		</>
	);
};
