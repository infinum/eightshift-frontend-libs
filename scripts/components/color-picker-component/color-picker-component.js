import React, { useRef } from 'react';
import { Popover, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ColorPaletteCustom, icons } from '@eightshift/frontend-libs/scripts';

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
 * @param {object} props                                - ColorPickerComponent options.
 * @param {array?} props.colors                         - List of options to display. If not set, all global manifest colors are used.
 * @param {string} props.value                          - Current value (color slug).
 * @param {function} props.onChange                     - Callback that applies the changes.
 * @param {React.Component?} props.label                - Label to represent the control
 * @param {boolean} [props.canReset=true]               - If `true`, a clear/reset button is shown.
 * @param {string} [props.pickerPopupTitle]             - Color picker popup title.
 * @param {string} [props.resetLabel]                   - 'Reset' button tooltip.
 * @param {string} [props.type=ColorPickerType.GENERIC] - Color picker type (determines the visual style of the picker).
 * @param {string} props.tooltip                        - Tooltip of the picker button (if label not provided).
 */
export const ColorPickerComponent = ({
	colors,
	value,
	onChange,
	label,
	canReset = true,
	pickerPopupTitle = __('Pick a color', 'eightshift-frontend-libs'),
	resetLabel = __('Reset', 'eightshift-frontend-libs'),
	type = ColorPickerType.GENERIC,
	tooltip,
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const ref = useRef();

	const openPicker = () => {
		setIsDropdownOpen(true);
		return false; // Prevents default behaviour for event.
	};

	const resetValue = () => {
		onChange(undefined);
		setIsDropdownOpen(false);
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

	const colorPicker = isDropdownOpen && (
		<Popover
			position='bottom center'
			onClose={() => setIsDropdownOpen(false)}
			anchorRef={ref?.current}
		>
			<div className='es-color-picker-component__inner-container'>
				<ColorPaletteCustom
					label={pickerPopupTitle}
					colors={colors}
					value={value}
					onChange={(value) => {
						onChange(value);
						setIsDropdownOpen(false);
					}}
					clearable={false}
				/>

				{canReset && value &&
					<Button
						onClick={resetValue}
						isDestructive={true}
						icon={icons.none}
						iconSize={24}
					>
						{resetLabel}
					</Button>
				}
			</div>
		</Popover>
	);

	const getButtonIcon = () => {
		if (!value) {
			return icons.colorSelect;
		}

		switch (type) {
			case ColorPickerType.TEXT_COLOR:
				return (
					<div style={{ '--selected-color': `var(--global-colors-${value})` }}>
						{icons.textColorSwatch}
					</div>
				);
			case ColorPickerType.TEXT_HIGHLIGHT_COLOR:
				return (
					<div style={{ '--selected-color': `var(--global-colors-${value})` }}>
						{icons.textHighlightColorSwatch}
					</div>
				);
			case ColorPickerType.BACKGROUND_COLOR:
				return (
					<div style={{ '--selected-color': `var(--global-colors-${value})` }}>
						{icons.backgroundColorSwatch}
					</div>
				);
			default:
				return (
					<div
						className='es-color-picker-component__current-swatch'
						style={{ backgroundColor: `var(--global-colors-${value})` }}>
					</div>
				);
		}
	};

	if (!label) {
		return (
			<>
				<Button
					isSecondary
					onClick={openPicker}
					icon={getButtonIcon()}
					iconSize={24}
					ref={ref}
					label={getTooltipText()}
				/>

				{colorPicker}
			</>
		);
	}

	return (
		<>
			<div className='es-flex-between'>
				<div className='es-label-flex'>{label}</div>

				<Button
					isSecondary
					onClick={openPicker}
					icon={getButtonIcon()}
					iconSize={24}
					ref={ref}
				/>
			</div>

			{colorPicker}
		</>
	);
};
