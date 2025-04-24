import React from 'react';
import { __ } from '@wordpress/i18n';
import { icons } from '@eightshift/ui-components/icons';
import {
	SolidColorPicker,
	GradientEditor,
	TriggeredPopover,
	OptionSelect,
	ButtonGroup,
	ColorSwatch,
	HStack,
	Button,
	Spacer,
} from '@eightshift/ui-components';
import { BaseControl } from '@eightshift/ui-components';
import { ColorPicker } from '@eightshift/ui-components';

/**
 * A flexible color picker that allows choice between project colors, custom solid colors or gradients.
 *
 * @param {object} props - AdvancedColorPicker options.
 * @param {string?} props.colorProject - Currently selected project color.
 * @param {string?} props.colorSolid - Currently selected solid color.
 * @param {string?} props.colorGradient - Currently selected gradient.
 * @param {string?} props.type - Currently selected color type.
 * @param {function} props.onChangeProject - Function called when the project color is changed.
 * @param {function} props.onChangeSolid - Function called when the solid color is changed.
 * @param {function} props.onChangeGradient - Function called when the gradient is changed.
 * @param {function} props.onChangeType - Function called when the color type is changed.
 * @param {object} props.globalManifest - Project's `globalManifest`.
 * @param {Array} [props.types] - Types of choices to show. The array should have objects in `{label: '', value: ''}` format. Defaults provide 'nothing', 'solid color', 'project color' and 'gradient' options.
 * @param {string?} [props.label] - Label displayed above the control.
 * @param {string?} [props.help] - Help text displayed below the control.
 * @param {boolean} [props.disabled=false] - If `true`, control is disabled.
 * @param {string?} [props.className] - If passed, the classes are added to the component's `BaseControl`.
 */
export const AdvancedColorPicker = (props) => {
	const {
		globalVariables: { colors: globalColors, gradients: globalGradients },
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

		icon = icons.imageOverlayAlt2,
		label = __('Background', 'eightshift-frontend-libs'),
		help,

		types = [
			{
				label: __('None', 'eightshift-frontend-libs'),
				value: '',
				endIcon: icons.emptyCircle,
				separator: 'below',
			},
			{
				label: __('Project color', 'eightshift-frontend-libs'),
				value: 'project',
				endIcon: icons.paletteColor,
			},
			{
				label: __('Color', 'eightshift-frontend-libs'),
				value: 'solid',
				endIcon: icons.color,
			},
			{
				label: __('Gradient', 'eightshift-frontend-libs'),
				value: 'gradient',
				endIcon: icons.gradient,
			},
		],

		disabled = false,

		className,
	} = props;

	const showProjectColor = types.find(({ value }) => value === 'project') !== undefined;
	const showSolidColor = types.find(({ value }) => value === 'solid') !== undefined;
	const showGradient = types.find(({ value }) => value === 'gradient') !== undefined;

	return (
		<BaseControl
			icon={icon}
			className={className}
			label={label}
			help={help}
			inline
		>
			<ButtonGroup>
				<OptionSelect
					value={type}
					options={types}
					onChange={(value) => onChangeType(value)}
					disabled={disabled}
					type='menu'
				/>

				{type === 'project' && showProjectColor && !disabled && (
					<ColorPicker
						value={colorProject}
						colors={typeof colorsProject == 'undefined' ? globalColors : colorsProject}
						onChange={onChangeProject}
					/>
				)}

				{type === 'solid' && showSolidColor && !disabled && (
					<TriggeredPopover triggerButtonIcon={<ColorSwatch color={colorSolid} />}>
						<SolidColorPicker
							color={colorSolid}
							onChange={(value) => onChangeSolid(value)}
						/>
					</TriggeredPopover>
				)}

				{type === 'gradient' && showGradient && !disabled && (
					<TriggeredPopover
						triggerButtonIcon={<ColorSwatch gradient={colorGradient} />}
						className='es:min-w-72 es:p-2'
					>
						<GradientEditor
							value={colorGradient ?? 'linear-gradient(to right, #000000 0%, #ffffff 100%)'}
							onChange={(value) => onChangeGradient(value)}
						/>

						{gradients?.length > 0 && (
							<>
								<Spacer
									text={__('Presets', 'eightshift-frontend-libs')}
									className='es:mt-3'
									border
								/>
								<HStack>
									{gradients.map(({ name, slug, gradient }) => (
										<Button
											key={slug}
											onPress={() => onChangeGradient(gradient)}
											icon={<ColorSwatch gradient={gradient} />}
											tooltip={name}
											aria-label={name}
										/>
									))}
								</HStack>
							</>
						)}
					</TriggeredPopover>
				)}
			</ButtonGroup>
		</BaseControl>
	);
};
