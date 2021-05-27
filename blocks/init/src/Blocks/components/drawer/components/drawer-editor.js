import React from 'react';
import classnames from 'classnames';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const DrawerEditor = (attributes) => {
	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
	} = attributes;

	const drawerUse = checkAttr('drawerUse', attributes, manifest);
	const drawerMenu = checkAttr('drawerMenu', attributes, manifest);
	const drawerTrigger = checkAttr('drawerTrigger', attributes, manifest);
	const drawerOverlay = checkAttr('drawerOverlay', attributes, manifest);
	const drawerPosition = checkAttr('drawerPosition', attributes, manifest);

	const drawerClass = classnames([
		componentClass,
		selector(componentClass, `js-${componentClass}`),
		selector(drawerPosition, componentClass, 'position', drawerPosition),
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{drawerUse &&
				<div
					className={drawerClass}
					data-trigger={drawerTrigger}
					data-overlay={drawerOverlay}
				>
					{drawerMenu}
				</div>
			}
		</>
	);
};
