import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { ColorPalette, icons, OptionSelector, ColorSwatch, Control, PopoverWithTrigger, TileButton } from '../../../scripts';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import ReactGPicker from 'react-gcolor-picker';

/**
 * A flexible color picker that allows choice between project colors, custom solid colors or gradients.
 *
 * @typedef {'top' | 'top left' | 'top right' | 'middle' | 'middle left' | 'middle right' | 'bottom' | 'bottom left' | 'bottom right'} AppearOrigin
 *
 * @param {object} props                                      - AdvancedColorPicker options.
 * @param {string?} props.colorProject                        - Currently selected project color.
 * @param {string?} props.colorSolid                          - Currently selected solid color.
 * @param {string?} props.colorGradient                       - Currently selected gradient.
 * @param {string?} props.type                                - Currently selected color type.
 * @param {function} props.onChangeProject                    - Function called when the project color is changed.
 * @param {function} props.onChangeSolid                      - Function called when the solid color is changed.
 * @param {function} props.onChangeGradient                   - Function called when the gradient is changed.
 * @param {function} props.onChangeType                       - Function called when the color type is changed.
 * @param {object} props.globalManifest                       - Project's `globalManifest`.
 * @param {Array} [props.types]                               - Types of choices to show. The array should have objects in `{label: '', value: ''}` format. Defaults provide 'nothing', 'solid color', 'project color' and 'gradient' options.
 * @param {string?} [props.label]                             - Label displayed above the control.
 * @param {string?} [props.help]                              - Help text displayed below the control.
 * @param {boolean} [props.disabled=false]                    - If `true`, control is disabled.
 * @param {boolean} [props.noBottomSpacing]                   - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]             - If `true`, space below the control is reduced.
 * @param {string?} [props.additionalClasses]                 - If passed, the classes are added to the component's `BaseControl`.
 * @param {boolean} [props.isTileButton=false]                - If `true`, the component is rendered as a tile button.
 * @param {AppearOrigin} [props.popoverPosition='top center'] - Position where the popover appears.
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
		reducedBottomSpacing,
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

		popoverPosition,
	} = props;

	const showProjectColor = types.find(({ value }) => value === 'project') !== undefined;
	const showSolidColor = types.find(({ value }) => value === 'solid') !== undefined;
	const showGradient = types.find(({ value }) => value === 'gradient') !== undefined;

	let color;

	if (type?.length > 0) {
		color = 'transparent';

		if (type === 'project' && colorProject !== 'transparent') {
			color = `var(--global-colors-${colorProject})`;
		} else if (type === 'solid') {
			color = colorSolid;
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
					additionalButtonClass='es-rounded-1.5!'
				/>
			</div>

			<div className='es-min-w-80 es-min-h-80 es-p-4 es-border-l-gray-400'>
				{type === 'project' && showProjectColor && !disabled &&
					<ColorPalette
						value={colorProject}
						colors={typeof colorsProject == 'undefined' ? globalColors : colorsProject}
						onChange={onChangeProject}
						searchable
						layout='listTwoCol'
					/>
				}

				{type === 'solid' && showSolidColor && !disabled &&
					<div className='es-v-spaced es-items-center es-content-center es-h-full es-w-full'>
						<HexColorPicker
							color={colorSolid}
							onChange={(value) => onChangeSolid(value)}
						/>

						<HexColorInput
							prefixed
							color={colorSolid}
							onChange={(value) => onChangeSolid(value)}
							className='es-solid-color-picker-hex-input es-w-20 es-p-2 es-rounded-1.5 es-border-cool-gray-300 es-text-3 es-uppercase'
						/>
					</div>
				}

				{type === 'gradient' && showGradient && !disabled &&
					<div className='es-gradient-picker-container es-h-112 es-h-center'>
						<ReactGPicker
							value={colorGradient}
							onChange={(value) => onChangeGradient(value)}
							gradient
							solid={false}
							showAlpha={false}
							defaultColors={gradients.map(({ gradient }) => gradient)}
						/>
					</div>
				}
			</div>
		</>
	);

	if (isTileButton) {
		return (
			<PopoverWithTrigger
				contentClass='es-display-flex'
				position={popoverPosition ?? 'bottom'}
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
			reducedBottomSpacing={reducedBottomSpacing}
			label={label}
			help={help}
			inlineLabel
		>
			<PopoverWithTrigger
				contentClass='es-display-flex'
				position={popoverPosition ?? 'middle right'}
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
