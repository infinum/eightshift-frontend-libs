import React from 'react';
import classnames from 'classnames';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const DrawerEditor = (attributes) => {
	const {
		componentClass,
		componentJsClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const drawerUse = checkAttr('drawerUse', attributes, manifest);
	const drawerMenu = checkAttr('drawerMenu', attributes, manifest);
	const drawerTrigger = checkAttr('drawerTrigger', attributes, manifest);
	const drawerOverlay = checkAttr('drawerOverlay', attributes, manifest);
	const drawerPosition = checkAttr('drawerPosition', attributes, manifest);

	const drawerClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
		selector(componentJsClass, componentJsClass),
		selector(drawerPosition, componentClass, 'position', drawerPosition),
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
