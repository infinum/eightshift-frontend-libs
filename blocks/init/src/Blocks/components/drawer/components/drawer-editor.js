import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const DrawerEditor = (attributes) => {
	const {
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		drawerUse = checkAttr('drawerUse', attributes, manifest, componentName),

		drawerMenu = checkAttr('drawerMenu', attributes, manifest, componentName),
		drawerTrigger = checkAttr('drawerTrigger', attributes, manifest, componentName),
		drawerOverlay = checkAttr('drawerOverlay', attributes, manifest, componentName),
		drawerPosition = checkAttr('drawerPosition', attributes, manifest, componentName),
	} = attributes;

	const drawerClass = classnames([
		componentClass,
		selector(componentClass, `js-${componentClass}`),
		selector(drawerPosition, componentClass, 'position', drawerPosition),
		selector(blockClass, blockClass, selectorClass),
	]);

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
