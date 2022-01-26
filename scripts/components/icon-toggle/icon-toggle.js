import React from 'react';
import { ToggleControl } from '@wordpress/components';

/**
 * Right-aligned toggle control with an icon and label on the left.
 * 
 * @param {object} props               - ComponentUseToggle options.
 * @param {string} props.label         - Usually component name.
 * @param {boolean} props.checked      - Is the component currently in use.
 * @param {function} props.onChange    - `onChange` handler from the `ToggleSwitch`.
 * @param {React.Component} props.icon - Icon to display.
 * @param {string?} props.help         - Help text to display.
 * @param {boolean} [props.disabled=false]  - If `true`, control is disabled.
 */
export const IconToggle = ({
	label,
	checked,
	onChange,
	icon,
	help,
	disabled = false,
}) => {
	return (
		<div className={`es-icon-toggle es-icon-toggle--reverse ${icon && help ? 'has-help' : ''}`}>
			{icon}
			<ToggleControl
				label={label}
				checked={checked}
				onChange={onChange}
				help={help}
				disabled={disabled}
			/>
		</div>
	);
};
