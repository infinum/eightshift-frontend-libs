import React, { useRef } from 'react';
import { Popover, Button, BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';

/**
 * Component that allows simple inline color picking while taking up not much space.
 * 
 * @param {object} props                    - ColorPickerComponent options.
 * @param {array?} props.colors             - List of options to display. If not set, all global manifest colors are used.
 * @param {string} props.value              - Current value (color slug).
 * @param {function} props.onChange         - Callback that applies the changes.
 * @param {React.Component?} props.label    - Label to represent the control
 * @param {boolean} [props.canReset=true]   - If `true`, a clear/reset button is shown.
 * @param {string} [props.pickerPopupTitle] - Color picker popup title.
 * @param {string} [props.editColorLabel]   - 'Change color' button label (when color is set).
 * @param {string} [props.addColorLabel]    - 'Pick a color' button label (when color is not set).
 * @param {string} [props.resetTootlip]     - 'Reset' button tooltip.
 */
export const ColorPickerComponent = ({
	colors,
	value,
	onChange,
	label,
	canReset = true,
	pickerPopupTitle = __('Pick a color'),
	editColorLabel = __('Change color'),
	addColorLabel = __('Pick a color'),
	resetTootlip = __('Reset'),
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
			</div>
		</Popover>
	);

	const buttonIcon = value ? (
		<div
			className='es-color-picker-component__current-swatch'
			style={{ backgroundColor: `var(--global-colors-${value})` }}
		></div>
	) : icons.color;

	return (
		<BaseControl
			label={label}
		>
			<div className='es-simple-editor-button-row'>
				<Button
					isSecondary
					onClick={openPicker}
					icon={buttonIcon}
					text={value ? editColorLabel : addColorLabel}
				>
				</Button>

				{canReset && value &&
					<Button
						onClick={resetValue}
						isDestructive={true}
						icon={icons.trash}
						iconSize={24}
						label={resetTootlip}
					/>
				}
			</div>

			{colorPicker}
		</BaseControl>
	);
}
