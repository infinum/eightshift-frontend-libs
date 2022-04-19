import React from 'react';
import { ToggleControl, CheckboxControl } from '@wordpress/components';
import { IconLabel } from '@eightshift/frontend-libs/scripts';

/**
 * Right-aligned toggle control with an icon and label on the left.
 * 
 * @param {object} props                     - ComponentUseToggle options.
 * @param {string} props.label               - Usually component name.
 * @param {boolean} props.checked            - Is the component currently in use.
 * @param {function} props.onChange          - `onChange` handler from the `ToggleSwitch`/`CheckboxControl`.
 * @param {React.Component} props.icon       - Icon to display.
 * @param {string?} props.help               - Help text to display.
 * @param {boolean} [props.disabled=false]   - If `true`, control is disabled.
 * @param {boolean} [props.isCheckbox=false] - If `true`, the control is rendered as a checkbox.
 */
export const IconToggle = ({
	label,
	checked,
	onChange,
	icon,
	help,
	disabled = false,
	isCheckbox = false,
}) => {
	const props = {
		checked,
		onChange,
		disabled,
		help,
		className: ['es-icon-toggle-checkbox', help ? 'es-icon-toggle-checkbox--with-help' : ''],
	};

	if (label) {
		if (icon) {
			props.label = (<IconLabel icon={icon} label={label} standalone />);
		} else {
			props.label = label;
		}
	}

	if (isCheckbox) {
		return (
			<CheckboxControl
				{...props}
			/>
		);
	}

	return (
		<ToggleControl
			{...props}
		/>
	);
};
