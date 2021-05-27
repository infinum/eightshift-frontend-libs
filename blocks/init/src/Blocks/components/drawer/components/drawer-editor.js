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

		drawerUse = checkAttr('drawerUse', attributes, manifest),

		drawerMenu = checkAttr('drawerMenu', attributes, manifest),
		drawerTrigger = checkAttr('drawerTrigger', attributes, manifest),
		drawerOverlay = checkAttr('drawerOverlay', attributes, manifest),
		drawerPosition = checkAttr('drawerPosition', attributes, manifest),
	} = attributes;

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
