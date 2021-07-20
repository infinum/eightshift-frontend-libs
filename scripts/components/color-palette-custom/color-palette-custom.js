import React, { useState } from 'react';
import { find } from 'lodash';
import { getColorObjectByColorValue } from '@wordpress/block-editor';
import { ColorPalette } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

/**
 * Modified version of WordPress's `ColorPalette` which saves values as color names/slugs instead of hex codes.
 * 
 * @param {object} props                             - ColorPaletteCustom options.
 * @param {array} props.colors                       - Colors to display.
 * @param {object} props.value                       - Current value.
 * @param {function} props.onChange                  - Function called when the value is modified.
 * @param {boolean} [props.disableCustomColors=true] - If `true`, custom color selection will be disabled.
 * @param {boolean} [props.clearable=false]          - If `true`, the color palette will have a *Clear* button.
 * @param {string?} [props.label]                    - Label displayed above the picker.
 * @param {string?} [props.help]                     - Help text displayed below the picker.
 */
export const ColorPaletteCustom = withSelect((select, ownProps) => {
	const { colors } = select('core/block-editor').getSettings();

	let newObj = ownProps;

	// Allow overrides of editor color palette for this block.
	if (!ownProps.colors) {
		newObj = Object.assign({ colors }, ownProps);
	}

	return { ...newObj };
})((props) => {
	const {
		colors,
		value,
		onChange,
		disableCustomColors = true,
		clearable = false,
		label,
		help,
	} = props;

	const [color, setColor] = useState(value);

	const colorValue = find(colors, { slug: color });

	const baseClass = 'components-base-control';

	const colorValueObject = (typeof colorValue === 'undefined') ? color : colorValue.color;

	return (
		<div className={baseClass}>
			{label?.length > 0 &&
				<div className={`${baseClass}__label`}>{label}</div>
			}
			<ColorPalette
				clearable={clearable}
				colors={colors}
				disableCustomColors={disableCustomColors}
				value={colorValueObject}
				onChange={(newColor) => {
					const colorObject = getColorObjectByColorValue(colors, newColor);

					setColor(() => newColor);

					let newColorValues;

					if (typeof colorObject === 'object' && Object.prototype.hasOwnProperty.call(colorObject, 'slug') && colorObject.slug) {
						newColorValues = colorObject.slug;
					} else {

						// For backwards compatibility, we're keeping the ability to set colors with just name.
						// The preferred way is to use a slug.
						newColorValues = (typeof colorObject === 'undefined') ? '' : colorObject.name;
					}

					onChange(newColorValues);
				}}
			/>

			{help?.length > 0 &&
				<p className={`${baseClass}__help`}>{help}</p>
			}
		</div>
	);
});
