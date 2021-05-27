import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const LayoutThreeColumnsEditor = (attributes) => {
	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		layoutUse = checkAttr('layoutUse', attributes, manifest),

		layoutLeft = checkAttr('layoutLeft', attributes, manifest),
		layoutCenter = checkAttr('layoutCenter', attributes, manifest),
		layoutRight = checkAttr('layoutRight', attributes, manifest),
	} = attributes;

	const layoutClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	const wrapClass = classnames([
		selector(componentClass, componentClass, 'wrap'),
		selector(selectorClass, selectorClass, 'wrap'),
	]);

	const columnLeftClass = classnames([
		selector(componentClass, componentClass, 'column'),
		selector(componentClass, componentClass, 'column'),
		selector(selectorClass, selectorClass, 'column', 'left'),
		selector(selectorClass, selectorClass, 'column', 'left'),
	]);

	const columnCenterClass = classnames([
		selector(componentClass, componentClass, 'column'),
		selector(componentClass, componentClass, 'column'),
		selector(selectorClass, selectorClass, 'column', 'center'),
		selector(selectorClass, selectorClass, 'column', 'center'),
	]);

	const columnRightClass = classnames([
		selector(componentClass, componentClass, 'column'),
		selector(componentClass, componentClass, 'column'),
		selector(selectorClass, selectorClass, 'column', 'right'),
		selector(selectorClass, selectorClass, 'column', 'right'),
	]);

	return (
		<>
			{layoutUse &&
				<div className={layoutClass}>
					<div className={wrapClass}>
						{layoutLeft &&
							<div className={columnLeftClass}>
								{layoutLeft}
							</div>
						}

						{layoutCenter &&
							<div className={columnCenterClass}>
								{layoutCenter}
							</div>
						}

						{layoutRight &&
							<div className={columnRightClass}>
								{layoutRight}
							</div>
						}
					</div>
				</div>
			}
		</>
	);
};
