import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const PageOverlayEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		pageOverlayUse = defaults.pageOverlayUse.default,

	} = attributes;

	const overlayClass = classnames([
		componentClass,
		blockClass && `${blockClass}__${selectorClass}`,
	]);

	return (
		<Fragment>
			{pageOverlayUse &&
				<div className={overlayClass}></div>
			}
		</Fragment>
	);
};
