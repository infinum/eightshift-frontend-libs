import React from 'react';
import { Checkbox, Toggle as EsUicToggle } from '@eightshift/ui-components';

/**
 * Custom toggle control.
 *
 * @param {object} props                                                                 - `Toggle` options.
 * @param {React.Component} props.icon                                                   - Icon to display.
 * @param {string} props.label                                                           - Usually component name.
 * @param {'toggle'|'checkbox'|'button'|'iconButton'|'tileButton'} [props.type='toggle'] - Kind of toggle to render.
 * @param {string?} props.help                                                           - Help text to display.
 * @param {boolean} [props.inlineHelp=false]                                             - If `true` and `help` is provided, the help content is rended below the label, instead of below the component.
 * @param {boolean} props.checked                                                        - Is the component currently in use.
 * @param {function} props.onChange                                                      - `onChange` handler from the `ToggleSwitch`/`CheckboxControl`.
 * @param {boolean} [props.disabled=false]                                               - If `true`, control is disabled.
 * @param {string?} [props.additionalClasses]                                            - If provided, classes are passed to the underlying component.
 */
export const Toggle = ({
	icon,
	label,

	type = 'toggle',

	help,
	inlineHelp = false,

	checked,
	onChange,

	disabled = false,

	additionalClasses,
}) => {
	if (type === 'checkbox') {
		return (
			<Checkbox
				checked={checked}
				onChange={onChange}
				disabled={disabled}
				subtitle={help}
				label={label}
				icon={icon}
				className={additionalClasses}
			/>
		);
	}

	return (
		<EsUicToggle
			checked={checked}
			onChange={onChange}
			disabled={disabled}
			subtitle={help}
			label={label}
			icon={icon}
			className={additionalClasses}
		/>
	);
};

/**
 * Custom toggle control.
 *
 * @deprecated since 9.5.0 - renamed to `Toggle`
 */
export const IconToggle = (props) => <Toggle {...props} />;
