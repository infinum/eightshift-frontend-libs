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

export const AdvancedColorPicker = (props) => {
	const {
		colorProject,
		colorSolid,
		colorGradient,

		colorsProject = globalColors,
		gradients = globalGradients,

		onChangeProject,
		onChangeSolid,
		onChangeGradient,
		onChangeType,

		id,
		label = <IconLabel icon={icons.backgroundType} label={__('Background', 'eightshift-frontend-libs')} />,
		type = 'none',

		showProjectColor = true,
		showSolidColor = true,
		showSolidGradient = true,

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

	return (
		<BaseControl id={id}>
			<CustomSelect
				label={label}
				value={types.find(({ value }) => value === type)}
				options={types}
				onChange={(({ value }) => onChangeType(value))}
				customOptionComponent={CustomPickerOption}
				customSingleValueDisplayComponent={CustomValueDisplay}
				isClearable={false}
				isSearchable={false}
			/>

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

			{type === 'gradient' && showSolidGradient &&
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
