import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { ColorPalette, icons, OptionSelector, ColorSwatch, Control, PopoverWithTrigger, TileButton, classnames } from '../../../scripts';
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
				icon: icons.paletteColor,
			},
			{
				label: __('Color', 'eightshift-frontend-libs'),
				value: 'solid',
				icon: icons.color,
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

	const showNone = types.find(({ value }) => value === '');
	const showProjectColor = types.find(({ value }) => value === 'project') !== undefined;
	const showSolidColor = types.find(({ value }) => value === 'solid') !== undefined;
	const showGradient = types.find(({ value }) => value === 'gradient') !== undefined;

	const currentColor = colorsProject?.find(({ slug }) => slug === colorProject);

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
		<div className='es-w-96'>
			<div className='es-h-between es-p-3'>
				<h4 className='es-m-0'>
					{label}
					{type !== '' &&
						<span className='es-font-weight-400 es-color-cool-gray-450'> &ndash; {types?.find(({ value }) => value === type)?.label}</span>
					}
				</h4>

				<Button
					className='es-button-square-24 es-button-icon-18'
					icon={icons.clear}
					esClosesModalOnClick
				/>
			</div>

			<div className='es-px-3 es-pb-3 es-border-b-cool-gray-300'>
				<OptionSelector
					value={type}
					options={types.filter(({ value }) => value?.length > 0)}
					onChange={((value) => onChangeType(value))}
					disabled={disabled}
					border='none'
					additionalButtonClass='es-rounded-1.5!'
					noBottomSpacing
					iconOnly
				/>
			</div>

			<div className={classnames(
				'es-min-w-80 es-min-h-112 es-p-3',
				type === '' && 'es-v-center es-nested-w-12 es-nested-h-12 es-nested-color-cool-gray-400'
			)}>
				{type === '' &&
					<>
						{icons.emptyRect}
						<span className='es-user-select-none'>{__('No background', 'eightshift-frontend-libs')}</span>
					</>
				}

				{type === 'project' && showProjectColor && !disabled &&
					<>
						<div className='es-h-spaced es-pb-3 es-w-full'>
							<ColorSwatch color={currentColor?.color ?? 'transparent'} additionalClasses='es-w-24 es-h-12 es-rounded-1.5!' />
							<div className='es-v-spaced es-gap-1!'>
								<span className='es-text-3 es-font-weight-600 es-line-h-1!'>
									{currentColor?.name ?? __('Select a color', 'eightshift-frontend-libs')}
								</span>

								{currentColor?.color &&
									<span className='es-text-2! es-color-cool-gray-420 es-line-h-1!'>{currentColor?.color}</span>
								}
							</div>
						</div>


						<ColorPalette
							value={colorProject}
							colors={typeof colorsProject == 'undefined' ? globalColors : colorsProject}
							onChange={onChangeProject}
							searchable
						/>
					</>
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
					<div className='es-gradient-picker-container es-h-104 es-pt-2 es-h-center'>
						<ReactGPicker
							value={colorGradient}
							onChange={(value) => onChangeGradient(value)}
							gradient
							solid={false}
							showAlpha={false}
							defaultActiveTab='gradient'
							defaultColors={gradients?.map(({ gradient }) => gradient).filter(Boolean) ?? []}
						/>
					</div>
				}
			</div>

			{showNone &&
				<div className='es-p-1 es-mt-3 es-border-t-cool-gray-300'>
					<Button
						disabled={disabled || type === ''}
						onClick={() => onChangeType('')}
						className='es-w-full es-h-center es-h-10 es-hover-bg-cool-gray-50 es-rounded-1.5! es-transition-colors'
					>
						{__('Clear', 'eightshift-frontend-libs')}
					</Button>
				</div>
			}
		</div>
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
				allowCloseFromChildren
				noArrow
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
				position={popoverPosition ?? 'bottom left'}
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
				allowCloseFromChildren
				noArrow
			>
				{popoverContent}
			</PopoverWithTrigger>
		</Control>
	);
};
