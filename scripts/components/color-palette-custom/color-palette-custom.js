import React from 'react';
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { STORE_NAME } from './../../editor/store';
import { ColorPicker } from '@eightshift/ui-components';

/**
 * Modified version of WordPress's `ColorPalette` which saves values as color names/slugs instead of hex codes.
 *
 * @deprecated Use `ColorPicker` from `@eightshift/ui-components` instead.
 *
 * @param {object} props - ColorPalette options.
 * @param {array} props.colors - Colors to display.
 * @param {object} props.value - Current value.
 * @param {function} props.onChange - Function called when the value is modified.
 * @param {boolean} [props.clearable=false] - If `true`, the color palette will have a *Clear* button.
 * @param {string?} [props.label] - Label displayed above the picker.
 * @param {string?} [props.help] - Help text displayed below the picker.
 * @param {React.Component?} [props.icon] - Icon to show next to the label
 * @param {boolean?} [props.noBottomSpacing] - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing] - If `true`, space below the control is reduced.
 * @param {boolean?} [props.inlineLabel] - If `true`, the label is displayed inline with the control. In that case `actions` are shown below the control.
 * @param {ColorPaletteLayout} [props.layout='tiles'] - Determines the layout of the control.
 * @param {boolean} [props.searchable=false] - If `true`, the list of color can be searched through.
 * @param {boolean} [props.disabled] - If `true`, the component can't be interacted with.
 * @param {boolean} [props.noShadeGrouping=false] - If `false`, color swatches will be grouped if there are 2 or more colors with the same beginning of the name, but different ending (-50, -100, ..., -900 or -10, -20, ..., -90).
 * @param {React.Component?} [props.subtitle] - Subtitle below the label.
 * @param {React.Component?} [props.actions] - Actions to show to the right of the label.
 */
export const ColorPalette = (props) => {
	const {
		colors = select(STORE_NAME).getSettings().globalVariables.colors,
		value,
		onChange,
		clearable = false,
		label,
		help,
		icon,
		disabled,
		noShadeGrouping = false,
		subtitle,
	} = props;

	return (
		<ColorPicker
			colors={colors}
			value={value}
			onChange={onChange}
			clearable={clearable}
			label={label}
			help={help}
			icon={icon}
			noColorGroups={noShadeGrouping}
			subtitle={subtitle}
			triggerProps={{ disabled: disabled }}
			showColorCode
		/>
	);
};
