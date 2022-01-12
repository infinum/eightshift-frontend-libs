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
};

const CustomPickerOption = (props) => {
	const { label, value } = props;
	return (
		<components.Option {...props}>
			<span className='es-custom-select-flex'>{getIcon(value)} {label}</span>
		</components.Option>
	);
};

const CustomValueDisplay = (props) => {
	const { data: { value, label } } = props;
	return (
		<components.SingleValue {...props}>
			<span className='es-custom-select-flex'>{getIcon(value)} {label}</span>
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
 * @param {boolean} [props.disabled=false]  - If `true`, control is disabled.
 */
export const AdvancedColorPicker = (props) => {
	const {
		globalVariables: {
			colors: globalColors,
			gradients: globalGradients,
		},
	} = props.globalManifest;

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
				label: __('No background', 'eightshift-frontend-libs'),
				value: ''
			},
			{
				label: __('Project color', 'eightshift-frontend-libs'),
				value: 'project'
			},
			{
				label: __('Solid color', 'eightshift-frontend-libs'),
				value: 'solid'
			},
			{
				label: __('Gradient', 'eightshift-frontend-libs'),
				value: 'gradient'
			}
		],

		disabled = false,
	} = props;

	const showProjectColor = types.find(({ value }) => value === 'project') !== undefined;
	const showSolidColor = types.find(({ value }) => value === 'solid') !== undefined;
	const showGradient = types.find(({ value }) => value === 'gradient') !== undefined;

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
				disabled={disabled}
			/>

			<br />

			{type === 'project' && showProjectColor && !disabled &&
				<ColorPaletteCustom
					value={colorProject}
					colors={typeof colorsProject == 'undefined' ? globalColors : colorsProject}
					onChange={onChangeProject}
				/>
			}

			{type === 'solid' && showSolidColor && !disabled &&
				<ColorPicker
					color={colorSolid}
					onChangeComplete={onChangeSolid}
					disableAlpha
				/>
			}

			{type === 'gradient' && showGradient && !disabled &&
				<GradientPicker
					value={colorGradient}
					onChange={onChangeGradient}
					gradients={gradients}
					colors={typeof gradients == 'undefined' ? globalGradients : gradients}
				/>
			}
		</BaseControl>
	);
};
