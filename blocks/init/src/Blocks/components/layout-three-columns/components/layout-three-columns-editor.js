import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selectorB, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const LayoutThreeColumnsEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		layoutUse = checkAttr('layoutUse', attributes, manifest),

		layoutLeft = checkAttr('layoutLeft', attributes, manifest),
		layoutCenter = checkAttr('layoutCenter', attributes, manifest),
		layoutRight = checkAttr('layoutRight', attributes, manifest),
	} = attributes;

	const layoutClass = classnames([
		componentClass,
		selectorB(blockClass, selectorClass),
	]);

	const wrapClass = classnames([
		selectorB(componentClass, 'wrap'),
		selectorB(selectorClass, 'wrap'),
	]);

	const columnLeftClass = classnames([
		selectorB(componentClass, 'column'),
		selectorB(componentClass, 'column'),
		selectorB(selectorClass, 'column', 'left'),
		selectorB(selectorClass, 'column', 'left'),
	]);

	const columnCenterClass = classnames([
		selectorB(componentClass, 'column'),
		selectorB(componentClass, 'column'),
		selectorB(selectorClass, 'column', 'center'),
		selectorB(selectorClass, 'column', 'center'),
	]);

	const columnRightClass = classnames([
		selectorB(componentClass, 'column'),
		selectorB(componentClass, 'column'),
		selectorB(selectorClass, 'column', 'right'),
		selectorB(selectorClass, 'column', 'right'),
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
