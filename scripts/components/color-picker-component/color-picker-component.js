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
 * @param {boolean?} [props.noBottomSpacing]                           - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]                      - If `true`, space below the control is reduced.
 * @param {string?} [props.additionalClasses]                          - If provided, the classes are appended to the control container.
 * @param {string?} [props.additionalTriggerClasses]                   - If provided, the classes are passed to the component's trigger button.
 * @param {AppearOrigin} [props.popoverPosition='top center']          - Position where the popover appears.
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

		noBottomSpacing,
		reducedBottomSpacing,

		additionalClasses,
		additionalTriggerClasses,

		popoverPosition,
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

	let popupContentWidthClass = 'es-min-w-96!';

	if (colorPaletteLayout === 'list') {
		popupContentWidthClass = 'es-min-w-56!';
	}

	if (colorPaletteLayout === 'tiles') {
		popupContentWidthClass = 'es-min-w-64!';
	}

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

		let icon = <ColorSwatch color={value === 'transparent' ? 'transparent' : `var(--global-colors-${value})`} />;

		switch (type) {
			case 'textColor':
				icon = React.cloneElement(icons.textColorSwatch, { style });
				break;
			case 'textHighlightColor':
				icon = React.cloneElement(icons.textHighlightColorSwatch, { style });
				break;
			case 'backgroundColor':
				icon = React.cloneElement(icons.backgroundColorSwatch, { style });
				break;
		}

		return icon;
	};

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
				position={popoverPosition ?? (label ? 'middle right' : 'bottom right')}
				trigger={
					({ ref, setIsOpen, isOpen }) => (
						<Button
							ref={ref}
							onClick={() => setIsOpen(!isOpen)}
							icon={getButtonIcon()}
							label={getTooltipText()}
							className={classnames('es-button-square-30 es-button-icon-24', additionalTriggerClasses)}
							disabled={disabled}
						/>
					)
				}
			>
				<div className={classnames('es-popover-content', popupContentWidthClass)}>
					<ColorPalette
						label={<h4 className='es-m-0'>{pickerPopupTitle ?? defaultPopupTitle}</h4>}
						colors={colors}
						value={value}
						onChange={onChange}
						clearable={canReset}
						layout={colorPaletteLayout}
						searchable={searchable}
						noShadeGrouping={noShadeGrouping}
						noBottomSpacing
						disabled={disabled}
					/>
				</div>
			</PopoverWithTrigger>
		</Control>
	);
};
