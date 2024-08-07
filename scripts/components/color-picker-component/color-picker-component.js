import React from 'react';
import { __ } from '@wordpress/i18n';
import { ColorPicker as EsUicColorPicker } from '@eightshift/ui-components';

/**
 * Component that allows simple inline color picking while taking up not much space.
 *
 * @deprecated Use `ColorPicker` from `@eightshift/ui-components` instead.
 *
 * @typedef {'generic'|'textColor'|'textHighlightColor'|'backgroundColor'} PickerType
 *
 * @param {object} props - ColorPicker options.
 * @param {string} props.value - Current value (color slug).
 * @param {array?} props.colors - List of options to display. If not set, all global manifest colors are used.
 * @param {function} props.onChange - Callback that applies the changes.
 * @param {PickerType} [props.type='generic'] - Color picker type (determines the visual style of the picker).
 * @param {boolean} [props.noShadeGrouping=false] - If `false`, color swatches will be grouped if there are 2 or more colors with the same beginning of the name, but different ending (-50, -100, ..., -900).
 * @param {boolean} [props.disabled=false] - If `true`, control is disabled.
 * @param {boolean} [props.canReset=false] - If `true`, a clear/reset button is shown.
 * @param {React.Component?} [props.icon] - Icon to show next to the label
 * @param {React.Component?} [props.label] - Label to represent the control
 * @param {React.Component?} [props.help] - Help text displayed below the control.
 * @param {string} [props.tooltip] - Tooltip of the picker button (if label not provided).
 * @param {React.Component?} [props.additionalControls] - Allows passing custom controls to the bottom of ColorPicker's popover.
 */
export const ColorPicker = (props) => {
	const {
		value,
		colors,
		onChange,

		type = 'generic',

		noShadeGrouping,
		disabled = false,

		canReset,

		icon,
		help,
		label,
		tooltip,

		additionalControls,
	} = props;

	return (
		<>
			<EsUicColorPicker
				value={value}
				colors={colors}
				onChange={onChange}
				type={type.replace('generic', 'default')}
				noColorGroups={noShadeGrouping}
				triggerProps={{ disabled: disabled }}
				icon={icon}
				label={label}
				subtitle={help}
				tooltip={tooltip}
				clearable={canReset}
				showColorCode
			/>
			{additionalControls}
		</>
	);
};
