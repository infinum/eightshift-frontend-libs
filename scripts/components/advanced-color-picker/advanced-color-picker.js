import React from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl, ColorPicker, __experimentalGradientPicker as GradientPicker } from '@wordpress/components';
import { ColorPaletteCustom, CustomSelect, icons, IconLabel } from '@eightshift/frontend-libs/scripts';
import { components } from 'react-select';

const getIcon = (value) => {
	if (!value) {
		return icons.none;
	}

	switch (value) {
		case 'project':
			return icons.paletteColor;
		case 'solid':
			return icons.solidColor;
		default:
			return icons[value];
	}
}

const CustomPickerOption = props => {
	return (
		<components.Option {...props}>
			<span className='es-custom-select-flex'>{getIcon(props.value)} {props.label}</span>
		</components.Option>
	);
};

const CustomValueDisplay = ({ ...props }) => {
	return (
		<components.SingleValue {...props}>
			<span className='es-custom-select-flex'>{getIcon(props.data.value)} {props.data.label}</span>
		</components.SingleValue>
	);
};

/**
 * A flexible color picker that allows choice between project colors, custom solid colors or gradients.
 * 
 * @param {object} props                    - AdvancedColorPicker options.
 * @param {string?} props.colorProject      - Currently selected project color.
 * @param {string?} props.colorSolid        - Currently selected solid color.
 * @param {string?} props.colorGradient     - Currently selected gradient.
 * @param {string?} props.type              - Currently selected color type.
 * @param {function} props.onChangeProject  - Function called when the project color is changed.
 * @param {function} props.onChangeSolid    - Function called when the solid color is changed.
 * @param {function} props.onChangeGradient - Function called when the gradient is changed.
 * @param {function} props.onChangeType     - Function called when the color type is changed.
 * @param {object} props.globalManifest     - Project's `globalManifest`.
 * @param {Array} [props.types]             - Types of choices to show. The array should have objects in `{label: '', value: ''}` format. Defaults provide 'nothing', 'solid color', 'project color' and 'gradient' options.
 * @param {string?} [props.label]           - Label displayed above the control.
 * @param {string?} [props.help]            - Help text displayed below the control.
 */
export const AdvancedColorPicker = (props) => {
	const {
		type = '',
		colorProject,
		colorSolid,
		colorGradient,

		colorsProject = globalColors,
		gradients = globalGradients,

		onChangeProject,
		onChangeSolid,
		onChangeGradient,
		onChangeType,

		label = <IconLabel icon={icons.backgroundType} label={__('Background', 'eightshift-frontend-libs')} />,
		help,

		types = [
			{
				"label": "No background",
				"value": ""
			},
			{
				"label": "Project color",
				"value": "project"
			},
			{
				"label": "Solid color",
				"value": "solid"
			},
			{
				"label": "Gradient",
				"value": "gradient"
			}
		],

		globalManifest,
	} = props;

	const {
		globalVariables: {
			colors: globalColors,
			gradients: globalGradients,
		},
	} = globalManifest;

	const showProjectColor = types.find(({value}) => value === 'project') !== undefined;
	const showSolidColor = types.find(({value}) => value === 'solid') !== undefined;
	const showGradient = types.find(({value}) => value === 'gradient') !== undefined;

	return (
		<BaseControl label={label} help={help}>
			<CustomSelect
				value={types.find(({ value }) => value === type)}
				options={types}
				onChange={(({ value }) => onChangeType(value))}
				customOptionComponent={CustomPickerOption}
				customSingleValueDisplayComponent={CustomValueDisplay}
				isClearable={false}
				isSearchable={false}
			/>

			<br />

			{type === 'project' && showProjectColor &&
				<ColorPaletteCustom
					value={colorProject}
					colors={typeof colorsProject == 'undefined' ? globalColors : colorsProject}
					onChange={onChangeProject}
				/>
			}

			{type === 'solid' && showSolidColor &&
				<ColorPicker
					color={colorSolid}
					onChangeComplete={onChangeSolid}
					disableAlpha
				/>
			}

			{type === 'gradient' && showGradient &&
				<GradientPicker
					value={colorGradient}
					onChange={onChangeGradient}
					gradients={gradients}
					colors={typeof gradients == 'undefined' ? globalGradients : gradients}
				/>
			}
		</BaseControl>
	)
}
