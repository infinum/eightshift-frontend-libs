import React from 'react';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { classnames, ColorSwatch, Control, icons, PopoverWithTrigger } from '../../../scripts';
import { ColorPalette } from '../color-palette-custom/color-palette-custom';

/**
 * Component that allows simple inline color picking while taking up not much space.
 *
 * @typedef {'generic'|'textColor'|'textHighlightColor'|'backgroundColor'} PickerType
 * @typedef {'top' | 'top left' | 'top right' | 'middle' | 'middle left' | 'middle right' | 'bottom' | 'bottom left' | 'bottom right'} AppearOrigin
 * @typedef {'tiles'|'list'|'listTwoCol'} ColorPaletteLayout
 *
 * @param {object} props                                               - ColorPicker options.
 * @param {string} props.value                                         - Current value (color slug).
 * @param {array?} props.colors                                        - List of options to display. If not set, all global manifest colors are used.
 * @param {function} props.onChange                                    - Callback that applies the changes.
 * @param {PickerType} [props.type='generic']                          - Color picker type (determines the visual style of the picker).
 * @param {string} [props.pickerPopupTitle]                            - Color picker popup title.
 * @param {boolean} [props.noShadeGrouping=false]                      - If `false`, color swatches will be grouped if there are 2 or more colors with the same beginning of the name, but different ending (-50, -100, ..., -900).
 * @param {boolean} [props.disabled=false]                             - If `true`, control is disabled.
 * @param {boolean} [props.searchable=false]                           - If `true`, the list of color can be searched through.
 * @param {boolean} [props.canReset=false]                              - If `true`, a clear/reset button is shown.
 * @param {ColorPaletteLayout} [props.colorPaletteLayout='listTwoCol'] - If provided, sets the layout of the popup color list.
 * @param {React.Component?} [props.icon]                              - Icon to show next to the label
 * @param {React.Component?} [props.label]                             - Label to represent the control
 * @param {React.Component?} [props.help]                              - Help text displayed below the control.
 * @param {string} [props.tooltip]                                     - Tooltip of the picker button (if label not provided).
 * @param {string} [props.expanded=false]                              - If `true`, the control is rendered in an expanded form.
 * @param {string} [props.border=false]                                - If `true`, the control is rendered with a border.
 * @param {boolean?} [props.inlineLabel=false]                         - If `true`, the control is rendered inline.
 * @param {boolean?} [props.noBottomSpacing]                           - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]                      - If `true`, space below the control is reduced.
 * @param {string?} [props.additionalClasses]                          - If provided, the classes are appended to the control container.
 * @param {string?} [props.additionalTriggerClasses]                   - If provided, the classes are passed to the component's trigger button.
 * @param {AppearOrigin} [props.popoverPosition='top center']          - Position where the popover appears.
 * @param {React.Component?} [props.buttonIconOverride]                - If provided, overrides the default trigger button icon.
 * @param {object?} [props.additionalButtonArgs]                       - Allows passing additional arguments to the trigger button.
 * @param {object?} [props.additionalColorPaletteArgs]                 - Allows passing additional arguments to the color palette component.
 */
export const ColorPicker = (props) => {
	const {
		value,
		colors,
		onChange,

		type = 'generic',
		pickerPopupTitle,

		noShadeGrouping,
		disabled = false,
		searchable = false,
		canReset = false,
		colorPaletteLayout = 'tiles',

		icon,
		help,
		label,
		tooltip,
		expanded = false,
		border = false,
		inlineLabel = false,

		noBottomSpacing,
		reducedBottomSpacing,

		additionalClasses,
		additionalTriggerClasses,

		popoverPosition,

		buttonIconOverride,
		additionalButtonArgs,
		additionalColorPaletteArgs,
	} = props;

	let defaultPopupTitle = __('Pick a color', 'eightshift-frontend-libs');

	switch (type) {
		case 'backgroundColor':
			defaultPopupTitle = __('Background color', 'eightshift-frontend-libs');
			break;
		case 'textColor':
			defaultPopupTitle = __('Text color', 'eightshift-frontend-libs');
			break;
		case 'textHighlightColor':
			defaultPopupTitle = __('Text highlight color', 'eightshift-frontend-libs');
			break;
	}

	const getTooltipText = () => {
		if (tooltip) {
			return tooltip;
		}

		switch (type) {
			case 'backgroundColor':
				return __('Background color', 'eightshift-frontend-libs');
			case 'textColor':
				return __('Text color', 'eightshift-frontend-libs');
			case 'textHighlightColor':
				return __('Text highlight color', 'eightshift-frontend-libs');
			default:
				return __('Color', 'eightshift-frontend-libs');
		}
	};

	const getButtonIcon = () => {
		let style = {};

		if (!value) {
			style = {
				'--selected-color': 'transparent',
				'--selected-opacity': '1',
			};
		} else {
			style = {
				'--checkerboard-opacity': value === 'transparent' ? 1 : 0,
				'--selected-color': value === 'transparent' ? 'transparent' : `var(--global-colors-${value})`,
			};
		}

		let icon = <ColorSwatch color={currentColor?.color} />;

		switch (type) {
			case 'textColor':
				icon = React.cloneElement(icons.textColorSwatch, { style });
				break;
			case 'textHighlightColor':
				icon = React.cloneElement(icons.textHighlightColorSwatch, { style });
				break;
			case 'backgroundColor':
				icon = React.cloneElement(icons.colorFillSwatch, { style });
				break;
		}

		return icon;
	};

	const currentColor = colors?.find(({ slug }) => slug === value);

	return (
		<Control
			icon={icon}
			additionalClasses={additionalClasses}
			noBottomSpacing={noBottomSpacing}
			reducedBottomSpacing={reducedBottomSpacing}
			label={label}
			help={help}
			inlineLabel={!expanded || inlineLabel}
		>
			<PopoverWithTrigger
				contentClass='es-display-flex'
				position={popoverPosition ?? (label ? 'bottom left' : 'bottom right')}
				trigger={
					({ ref, setIsOpen, isOpen }) => (
						<Button
							ref={ref}
							onClick={() => setIsOpen(!isOpen)}
							icon={buttonIconOverride ?? getButtonIcon()}
							label={getTooltipText()}
							className={classnames(
								'es-button-icon-24 es-rounded-1.25!',
								expanded && 'es-p-1.5!',
								expanded && !inlineLabel && 'es-w-full',
								expanded && inlineLabel && 'es-w-29 es-text-3',
								!expanded && 'es-button-square-36',
								(border || expanded) && 'es-slight-button-border-cool-gray-400',
								additionalTriggerClasses
							)}
							disabled={disabled}
							{...additionalButtonArgs}
						>
							{expanded && (colors?.find(({ slug }) => slug === value)?.name ?? __('Color', 'eightshift-frontend-libs'))}
						</Button>

					)
				}
				allowCloseFromChildren
				noArrow
			>
				<div className='es-min-w-96!'>
					<div className='es-h-between es-p-3'>
						<h4 className='es-m-0'>{pickerPopupTitle ?? defaultPopupTitle}</h4>

						<Button
							className='es-button-square-24 es-button-icon-18'
							icon={icons.clear}
							esClosesModalOnClick
						/>
					</div>

					<div className='es-h-spaced es-px-3 es-pb-3 es-mb-3 es-border-b-cool-gray-300 es-w-full'>
						<ColorSwatch
							color={currentColor?.color ?? 'es-undefined'}
							additionalClasses='es-w-24 es-h-12 es-rounded-1.5!'
						/>

						<div className='es-v-spaced es-gap-1!'>
							<span className='es-text-3.5 es-font-weight-500 es-line-h-1!'>
								{currentColor?.name ?? __('Select a color', 'eightshift-frontend-libs')}
							</span>

							{currentColor?.color && currentColor?.color?.startsWith('#') &&
								<span className='es-text-3 es-color-cool-gray-400 es-line-h-1'>{currentColor?.color}</span>
							}
						</div>
					</div>

					<div className={classnames('es-px-3', !canReset && 'es-pb-3')}>
						<ColorPalette
							colors={colors}
							value={value}
							onChange={onChange}
							layout={colorPaletteLayout}
							searchable={searchable}
							noShadeGrouping={noShadeGrouping}
							disabled={disabled}
							noBottomSpacing
							{...additionalColorPaletteArgs}
						/>
					</div>

					{canReset &&
						<div className='es-p-1 es-mt-3 es-border-t-cool-gray-300'>
							<Button
								disabled={disabled}
								onClick={() => onChange(undefined)}
								className='es-w-full es-h-center es-h-10 es-hover-bg-cool-gray-50 es-rounded-1.5! es-transition-colors'
							>
								{__('Clear', 'eightshift-frontend-libs')}
							</Button>
						</div>
					}
				</div>
			</PopoverWithTrigger>
		</Control>
	);
};
