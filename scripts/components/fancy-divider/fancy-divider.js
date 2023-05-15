import React from 'react';
import { IconLabel, classnames } from '@eightshift/frontend-libs/scripts';

/**
 * A simple <hr /> replacement that draws text and an optional icon.
 *
 * @param {object} props                          - FancyDivider options.
 * @param {React.Component?} [props.icon]         - If provided, icon shown on the divider.
 * @param {string} props.label                    - Label shown on the divider.
 * @param {React.Component?} [props.subtitle]     - If provided, subtitle shown on the divider.
 * @param {boolean} [props.hasTopSpacing=false]   - If `true`, top spacing is added.
 * @param {boolean} [props.noBottomSpacing=false]       - If `true`, the default bottom spacing is removed.
 * @param {string?} [props.additionalClasses]     - Allows passing through extra classes.
 */
export const FancyDivider = (props) => {
	const {
		icon,
		label,
		subtitle,

		hasTopSpacing = false,
		noBottomSpacing = false,

		additionalClasses,
	} = props;

	return (
		<div className={classnames('es-h-spaced es-nested-p-0.75 es-nested-bg-cool-gray-450 es-nested-rounded-1 es-nested-color-pure-white es-color-cool-gray-600', hasTopSpacing && 'es-mt-3', !noBottomSpacing && 'es-mb-2.5', additionalClasses)}>
			<IconLabel icon={icon} label={label} subtitle={subtitle} standalone additionalClasses='es-nested-bg-cool-gray-450 es-nested-rounded-1 es-nested-color-pure-white! es-has-enhanced-contrast-icon' />

			<div className='es-w-full es-flex-1 es-h-px es-bg-cool-gray-100'></div>
		</div>
	);
};
