import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const LayoutThreeColumnsEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		layoutUse = defaults.layoutUse.default,

		layoutLeft,
		layoutCenter,
		layoutRight,
	} = attributes;

	const layoutClass = classnames(
		componentClass,
		selectorClass,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	const wrapClass = classnames(
		`${componentClass}__wrap`,
		`${selectorClass}__wrap`,
	);

	const columnLeftClass = classnames(
		`${componentClass}__column`,
		`${selectorClass}__column`,
		`${componentClass}__column--left`,
		`${selectorClass}__column--left`,
	);

	const columnCenterClass = classnames(
		`${componentClass}__column`,
		`${selectorClass}__column`,
		`${componentClass}__column--center`,
		`${selectorClass}__column--center`,
	);

	const columnRightClass = classnames(
		`${componentClass}__column`,
		`${selectorClass}__column`,
		`${componentClass}__column--right`,
		`${selectorClass}__column--right`,
	);

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
