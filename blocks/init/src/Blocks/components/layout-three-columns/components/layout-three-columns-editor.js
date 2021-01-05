import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const LayoutThreeColumnsEditor = (attributes) => {
	const {
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		layoutUse = checkAttr('layoutUse', attributes, manifest, componentName),

		layoutLeft = checkAttr('layoutLeft', attributes, manifest, componentName),
		layoutCenter = checkAttr('layoutCenter', attributes, manifest, componentName),
		layoutRight = checkAttr('layoutRight', attributes, manifest, componentName),
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
		<Fragment>
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
		</Fragment>
	);
};
