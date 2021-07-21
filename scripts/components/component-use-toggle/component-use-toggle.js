import React from 'react';
import { ToggleControl } from '@wordpress/components';

/**
 * A fancy replacement for a component Use toggle.
 * 
 * @param {object} props                       - ComponentUseToggle options.
 * @param {string} props.label                 - Usually component name.
 * @param {boolean} props.checked              - Is the component currently in use.
 * @param {function} props.onChange            - `onChange` handler from the `ToggleSwitch`.
 * @param {boolean} [props.showUseToggle=true] - If `true`, the use toggle is shown.
 * @param {boolean} [props.showLabel=true]     - If `true` and the toggle is not visible, the label will be shown.
 */
export const ComponentUseToggle = ({
	label,
	checked,
	onChange,
	showUseToggle = true,
	showLabel = true,
}) => {
	return (
		<>
			{showUseToggle &&
				<ToggleControl
					label={label}
					checked={checked}
					onChange={onChange}
					className='es-panel-text-divider es-icon-toggle es-icon-toggle--reverse'
				/>
			}

			{!showUseToggle && showLabel && label && <span className='es-panel-text-divider'>{label}</span>}
		</>
	);
}
