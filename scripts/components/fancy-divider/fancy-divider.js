import { IconLabel } from '@eightshift/frontend-libs/scripts/components/icon-label/icon-label';
import React from 'react';

/**
 * A simple <hr /> replacement that draws text and an optional icon.
 *
 * @param {object} props                      - FancyDivider options.
 * @param {string} props.label                - Label shown on the divider.
 * @param {React.Component?} [props.icon]     - Icon shown on the divider.
 * @param {string?} [props.additionalClasses] - Allows passing through extra classes.
 */
export const FancyDivider = (props) => {
	const {
		label,
		icon,

		additionalClasses,
	} = props;

	if (!icon) {
		return (
			<div className={`es-h-spaced es-mt-3 es-mb-2.5 es-nested-p-0.75 es-nested-bg-cool-gray-450 es-nested-rounded-1.0 es-nested-color-pure-white es-color-cool-gray-500 ${additionalClasses ?? ''}`}>
				{label}

				<div className='es-w-full es-flex-1 es-h-px es-bg-cool-gray-50'></div>
			</div>
		);
	}

	return (
		<div className={`es-h-spaced es-mt-3 es-mb-2.5 es-nested-p-0.75 es-color-cool-gray-500 ${additionalClasses ?? ''}`}>
			<IconLabel icon={icon} label={label} standalone additionalClasses='es-nested-bg-cool-gray-450 es-nested-rounded-1.0 es-nested-color-pure-white!' />

			<div className='es-w-full es-flex-1 es-h-px es-bg-cool-gray-50'></div>
		</div>
	);
};
