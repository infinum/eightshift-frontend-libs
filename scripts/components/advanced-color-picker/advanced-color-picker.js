import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button, ColorPicker, GradientPicker, __experimentalGradientPicker as GradientPickerOld } from '@wordpress/components';
import { ColorPaletteCustom, icons, OptionSelector, ColorPaletteCustomLayout, ColorSwatch, Control, PopoverWithTrigger, TileButton } from '../../../scripts';

/**
 * A flexible color picker that allows choice between project colors, custom solid colors or gradients.
 *
 * @param {object} props                          - AdvancedColorPicker options.
 * @param {string?} props.colorProject            - Currently selected project color.
 * @param {string?} props.colorSolid              - Currently selected solid color.
 * @param {string?} props.colorGradient           - Currently selected gradient.
 * @param {string?} props.type                    - Currently selected color type.
 * @param {function} props.onChangeProject        - Function called when the project color is changed.
 * @param {function} props.onChangeSolid          - Function called when the solid color is changed.
 * @param {function} props.onChangeGradient       - Function called when the gradient is changed.
 * @param {function} props.onChangeType           - Function called when the color type is changed.
 * @param {object} props.globalManifest           - Project's `globalManifest`.
 * @param {Array} [props.types]                   - Types of choices to show. The array should have objects in `{label: '', value: ''}` format. Defaults provide 'nothing', 'solid color', 'project color' and 'gradient' options.
 * @param {string?} [props.label]                 - Label displayed above the control.
 * @param {string?} [props.help]                  - Help text displayed below the control.
 * @param {boolean} [props.disabled=false]        - If `true`, control is disabled.
 * @param {boolean} [props.noBottomSpacing=false] - If `true`, the default bottom spacing is removed.
 * @param {string?} [props.additionalClasses]     - If passed, the classes are added to the component's `BaseControl`.
 * @param {boolean} [props.isTileButton=false]    - If `true`, the component is rendered as a tile button.
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

		icon = icons.imageOverlayAlt2,
		label = __('Background', 'eightshift-frontend-libs'),
		noBottomSpacing,
		help,

		types = [
			{
				label: __('None', 'eightshift-frontend-libs'),
				value: '',
				icon: icons.emptyCircle,
			},
			{
				label: __('Project color', 'eightshift-frontend-libs'),
				value: 'project',
				icon: icons.colorAlt,
			},
			{
				label: __('Custom color', 'eightshift-frontend-libs'),
				value: 'solid',
				icon: icons.solidCircleFilled,
			},
			{
				label: __('Gradient', 'eightshift-frontend-libs'),
				value: 'gradient',
				icon: icons.gradient,
			}
		],

		disabled = false,

		additionalClasses,

		isTileButton = false,
	} = props;

	const showProjectColor = types.find(({ value }) => value === 'project') !== undefined;
	const showSolidColor = types.find(({ value }) => value === 'solid') !== undefined;
	const showGradient = types.find(({ value }) => value === 'gradient') !== undefined;

	// GradientPicker implemented in WP version 5.9
	const GradientPickerComponent = GradientPicker ?? GradientPickerOld;

	let color;

	if (type?.length > 0) {
		color = 'transparent';

		if (type === 'project' && colorProject !== 'transparent') {
			color = `var(--global-colors-${colorProject})`;
		} else if (type === 'solid') {
			color = colorSolid?.hex ?? colorSolid;
		} else if (type === 'gradient') {
			color = colorGradient;
		}
	}

	const popoverContent = (
		<>
			<div className='es-w-48 es-h-full es-p-4 es-flex-shrink-0'>
				<OptionSelector
					value={type}
					options={types}
					onChange={((value) => onChangeType(value))}
					disabled={disabled}
					alignment='vertical'
					border='none'
					noBottomSpacing
				/>
			</div>

			<div className='es-min-w-80 es-min-h-80 es-p-4 es-border-l-gray-400'>
				{type === 'project' && showProjectColor && !disabled &&
					<ColorPaletteCustom
						value={colorProject}
						colors={typeof colorsProject == 'undefined' ? globalColors : colorsProject}
						onChange={onChangeProject}
						searchable
						layout={ColorPaletteCustomLayout.LIST_TWO_COL}
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
					<GradientPickerComponent
						value={colorGradient}
						onChange={onChangeGradient}
						gradients={gradients}
						colors={typeof gradients == 'undefined' ? globalGradients : gradients}
					/>
				}
			</div>
		</>
	);

	if (isTileButton) {
		return (
			<PopoverWithTrigger
				contentClass='es-display-flex'
				trigger={
					({ ref, setIsOpen, isOpen }) => (
						<TileButton
							ref={ref}
							onClick={() => setIsOpen(!isOpen)}
							icon={<ColorSwatch color={color} />}
							label={label}
							className='es-button-square-30 es-button-icon-24'
						/>
					)
				}
			>
				{popoverContent}
			</PopoverWithTrigger>
		);
	}

	return (
		<Control
			icon={icon}
			additionalClasses={additionalClasses}
			noBottomSpacing={noBottomSpacing}
			label={label}
			help={help}
			inlineLabel
		>
			<PopoverWithTrigger
				contentClass='es-display-flex'
				trigger={
					({ ref, setIsOpen, isOpen }) => (
						<Button
							ref={ref}
							onClick={() => setIsOpen(!isOpen)}
							icon={<ColorSwatch color={color} />}
							label={__('Pick a color or gradient', 'eightshift-frontend-libs')}
							className='es-button-square-30 es-button-icon-24'
						/>
					)
				}
			>
				{popoverContent}
			</PopoverWithTrigger>
		</Control>
	);
};
