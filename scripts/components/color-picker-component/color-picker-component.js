import React, { useRef } from 'react';
import { Popover, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ColorPaletteCustom, icons } from '../../../scripts';
import { ColorPaletteCustomLayout } from '../color-palette-custom/color-palette-custom';

/**
 * Determines the color picker type.
 *
 * - `TEXT_COLOR` - displays an icon suitable for text color selection.
 * - `TEXT_HIGHLIGHT_COLOR` - displays an icon suitable for text highlight color selection.
 * - `BACKGROUND_COLOR` - displays an icon suitable for background color selection.
 * - `GENERIC` - displays an generic color selection icon.
 */
export const ColorPickerType = {
	TEXT_COLOR: 'textColor',
	TEXT_HIGHLIGHT_COLOR: 'textHighlight',
	BACKGROUND_COLOR: 'bgColor',
	GENERIC: 'generic',
};

/**
 * Component that allows simple inline color picking while taking up not much space.
 *
 * @param {object} props                                                                              - ColorPickerComponent options.
 * @param {array?} props.colors                                                                       - List of options to display. If not set, all global manifest colors are used.
 * @param {string} props.value                                                                        - Current value (color slug).
 * @param {function} props.onChange                                                                   - Callback that applies the changes.
 * @param {React.Component?} props.label                                                              - Label to represent the control
 * @param {boolean} [props.canReset=true]                                                             - If `true`, a clear/reset button is shown.
 * @param {string} [props.pickerPopupTitle]                                                           - Color picker popup title.
 * @param {string} [props.type=ColorPickerType.GENERIC]                                               - Color picker type (determines the visual style of the picker).
 * @param {string} props.tooltip                                                                      - Tooltip of the picker button (if label not provided).
 * @param {boolean} [props.disabled=false]                                                            - If `true`, control is disabled.
 * @param {boolean} [props.searchable=false]                                                          - If `true`, the list of color can be searched through.
 * @param {boolean} [props.groupShades=true]                                                          - If `true`, color swatches will be grouped if there are 2 or more colors with the same beginning of the name, but different ending (-50, -100, ..., -900).
 * @param {boolean?} [props.includeWpBottomSpacing=false]                                             - If `true`, the WP default control spacing will be applied.
 * @param {string?} [props.additionalClasses]                                                         - If provided, the classes are passed to the component.
 * @param {string?} [props.additionalTriggerClasses]                                                  - If provided, the classes are passed to the component's trigger button.
 * @param {ColorPaletteCustomLayout} [props.colorPaletteLayout=ColorPaletteCustomLayout.LIST_TWO_COL] - If provided, sets the layout of the popup color list.
 */
export const ColorPickerComponent = ({
	colors,
	value,
	onChange,
	label,
	canReset = false,
	pickerPopupTitle,
	type = ColorPickerType.GENERIC,
	tooltip,
	disabled = false,
	searachable = false,
	groupShades = true,
	includeWpBottomSpacing = false,
	additionalClasses,
	additionalTriggerClasses,
	colorPaletteLayout = ColorPaletteCustomLayout.LIST_TWO_COL,
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	let defaultPopupTitle = __('Pick a color', 'eightshift-frontend-libs');

	switch (type) {
		case ColorPickerType.BACKGROUND_COLOR:
			defaultPopupTitle = __('Background color', 'eightshift-frontend-libs');
			break;
		case ColorPickerType.TEXT_COLOR:
			defaultPopupTitle = __('Text color', 'eightshift-frontend-libs');
			break;
		case ColorPickerType.TEXT_HIGHLIGHT_COLOR:
			defaultPopupTitle = __('Text highlight color', 'eightshift-frontend-libs');
			break;
	}

	const ref = useRef();

	const openPicker = () => {
		setIsDropdownOpen(true);
		return false; // Prevents default behaviour for event.
	};

	const getTooltipText = () => {
		if (tooltip) {
			return tooltip;
		}

		switch (type) {
			case ColorPickerType.BACKGROUND_COLOR:
				return __('Background color', 'eightshift-frontend-libs');
			case ColorPickerType.TEXT_COLOR:
				return __('Text color', 'eightshift-frontend-libs');
			case ColorPickerType.TEXT_HIGHLIGHT_COLOR:
				return __('Text highlight color', 'eightshift-frontend-libs');
			default:
				return __('Color', 'eightshift-frontend-libs');
		}
	};

	let popupContentWidthClass = 'es-min-w-96!';

	if (colorPaletteLayout === ColorPaletteCustomLayout.LIST) {
		popupContentWidthClass = 'es-min-w-56!';
	}

	if (colorPaletteLayout === ColorPaletteCustomLayout.DEFAULT) {
		popupContentWidthClass = 'es-min-w-64!';
	}

	const colorPicker = (
		isDropdownOpen &&
		<Popover
			onClose={() => setIsDropdownOpen(false)}
			anchorRef={ref?.current}
			noArrow={false}
		>
			<div className={`es-popover-content ${popupContentWidthClass}`}>
				<ColorPaletteCustom
					label={<h4 className='es-m-0'>{pickerPopupTitle ?? defaultPopupTitle}</h4>}
					colors={colors}
					value={value}
					onChange={(value) => {
						onChange(value);
					}}
					clearable={canReset}
					inline
					layout={colorPaletteLayout}
					searachable={searachable}
					groupShades={groupShades}
				/>
			</div>
		</Popover>
	);

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

		let icon = React.cloneElement(icons.genericColorSwatch, { style });

		switch (type) {
			case ColorPickerType.TEXT_COLOR:
				icon = React.cloneElement(icons.textColorSwatch, { style });
				break;
			case ColorPickerType.TEXT_HIGHLIGHT_COLOR:
				icon = React.cloneElement(icons.textHighlightColorSwatch, { style });
				break;
			case ColorPickerType.BACKGROUND_COLOR:
				icon = React.cloneElement(icons.backgroundColorSwatch, { style });
				break;
		}

		return icon;
	};

	const triggerButton = (
		<Button
			onClick={openPicker}
			icon={getButtonIcon()}
			ref={ref}
			label={getTooltipText()}
			disabled={disabled}
			className={`es-button-icon-24 ${additionalTriggerClasses ?? ''}`}
		/>
	);

	if (!label) {
		return (
			<div className={`${includeWpBottomSpacing ? 'es-has-wp-field-b-space' : ''} ${additionalClasses ?? ''}`}>
				{triggerButton}

				{colorPicker}
			</div>
		);
	}

	return (
		<>
			<div className={`es-flex-between ${includeWpBottomSpacing ? 'es-has-wp-field-b-space' : ''} ${additionalClasses ?? ''}`}>
				<div className='es-label-flex'>{label}</div>

				{triggerButton}
			</div>

			{colorPicker}
		</>
	);
};
