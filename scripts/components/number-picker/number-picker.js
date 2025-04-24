import React from 'react';
import { __ } from '@wordpress/i18n';
import { NumberPicker as EsUicNumberPicker } from '@eightshift/ui-components';

/**
 * @deprecated Use `NumberControl` from `@eightshift/ui-components` instead.
 *
 * A simple number picker, built on the Gutenberg `NumberControl`.
 *
 * @param {object} props                                  - `NumberPicker` options.
 * @param {Number} [props.min=0]                          - Minimum allowed value.
 * @param {Number} props.max                              - Maximum allowed value.
 * @param {Number} [props.step=1]                         - Step change.
 * @param {Number} props.value                            - Current value.
 * @param {function} [props.onChange]                     - Function called when the value changes.
 * @param {boolean} [props.disabled=false]                - If `true`, the component is disabled.
 * @param {React.Component?} [props.icon]                 - Icon to show next to the label
 * @param {React.Component?} [props.label]                - Label to show above component.
 * @param {React.Component?} [props.subtitle]             - Subtitle below the label.
 * @param {React.Component?} [props.help]                 - Help to show below the control.
 * @param {React.Component?} [props.children]             - Content to show.
 * @param {boolean?} [props.inlineLabel]                  - If `true`, the label is displayed inline with the control. In that case `actions` are shown below the control.
 * @param {string?} [props.placeholder]                   - Placeholder to show inside the NumberPicker.
 * @param {Number?} [props.fixedWidth]                    - If passed, sets the width of the input field to the provided number of characters. Useful if you have e.g. value from 1 to 1000, but you don't want the input field to change size when on lower values.
 * @param {string|React.Component} [props.prefix]         - If passed, displayed before input field.
 * @param {string|React.Component} [props.suffix]         - If passed, displayed after the input field.
 * @param {React.Component?} [props.extraButton]          - If passed, the control is displayed to the right of the spinner buttons.
 * @param {boolean?} [props.noExtraButtonSeparator=false] - If passed, and the `extraButton` is added, the separator between the spinner buttons and the extra button is hidden.
 */
export const NumberPicker = (props) => {
	const {
		min = 0,
		max,
		step = 1,
		value,
		onChange,
		disabled = false,

		icon,
		help,
		label,
		subtitle,
		inlineLabel,

		placeholder,

		fixedWidth = null,

		prefix,
		suffix,

		extraButton,
	} = props;

	return (
		<EsUicNumberPicker
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={onChange}
			disabled={disabled}
			icon={icon}
			help={help}
			label={label}
			subtitle={subtitle}
			inline={inlineLabel}
			placeholder={placeholder}
			fixedWidth={fixedWidth}
			prefix={prefix}
			suffix={suffix}
		>
			{extraButton}
		</EsUicNumberPicker>
	);
};
