import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';

/**
 * A fancy replacement for a component Use toggle.
 *
 * @param {object} props                       - ComponentUseToggle options.
 * @param {string} props.label                 - Usually component name.
 * @param {boolean} props.checked              - Is the component currently in use.
 * @param {function} props.onChange            - `onChange` handler from the `ToggleSwitch`.
 * @param {boolean} [props.showUseToggle=true] - If `true`, the use toggle is shown.
 * @param {boolean} [props.showLabel=true]     - If `true`, the label is shown.
 * @param {boolean} [props.disabled=false]     - Is the component currently disabled.
 */
export const ComponentUseToggle = ({
	label,
	checked,
	onChange,
	showUseToggle = true,
	disabled = false,
	showLabel = true,
}) => {
	if (!showUseToggle && !showLabel) {
		return null;
	}

	const toggleIcon = React.cloneElement(icons.toggleOff, {
		className: `es-collapsable-component-use-toggle-v2__toggle-button has-full-color-off-state ${checked ? 'is-active' : ''}`,
	});

	return (
		<div className={`es-collapsable-component-use-toggle-v2__trigger es-h-between es-mb-2.5 es-pb-1.0 ${checked ? 'es-border-b-cool-gray-300' : 'es-border-b-transparent'}`}>
			<div className='es-h-spaced'>
				{showUseToggle &&
					<Button
						icon={toggleIcon}
						onClick={() => onChange(!checked)}
						disabled={disabled}
						className='es-button-square-24 es-button-icon-24 es-button-no-outline es-p-0!'
						label={checked ? __('Disable', 'eightshift-frontend-libs') : __('Enable', 'eightshift-frontend-libs')}
						showTooltip
					/>
				}

				{label && (showLabel || showUseToggle) &&
					<span className='es-collapsable-component-use-toggle-v2__label'>
						{label}
					</span>
				}
			</div>
		</div>
	);
};
