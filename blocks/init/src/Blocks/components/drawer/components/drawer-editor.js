import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const DrawerEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		drawerUse = defaults.drawerUse.default,

		drawerPosition = defaults.drawerPosition.default,
		drawerMenu,
		drawerTrigger,
		drawerOverlay,
	} = attributes;

	const drawerClass = classnames(
		componentClass,
		`js-${componentClass}`,
		drawerPosition && `${componentClass}--${drawerPosition}`,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	return (
		<Fragment>
			{drawerUse &&
				<div
					className={drawerClass}
					data-trigger={drawerTrigger}
					data-overlay={drawerOverlay}
				>
					{drawerMenu}
				</div>
			}
		</Fragment>
	);
};
