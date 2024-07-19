import React from 'react';
import { Slider as EsUicSlider } from '@eightshift/ui-components';

/**
 * A modern and customizable custom range slider.
 *
 * @deprecated Use `Slider` from `@eightshift/ui-components` instead.
 *
 * @typedef {null | 'dots' | true | {Number: string} | {Number: {style, label}}} DotStyle
 *
 * @param {object} props                                   - RangeSlider options.
 * @param {Number} [props.min]                             - Minimum value of the slider.
 * @param {Number} [props.max]                             - Maximum value of the slider.
 * @param {Number|null} [props.step=1]                     - Value between slider steps. Must be greater than zero, `max` - `min` should be evenly divisible by the step value. If `marks` are set, you can set `step` to `null` to use `marks` as only steps.
 * @param {Number[]} [props.value]                         - Current value of the slider.
 * @param {function} [props.onChange]                      - Function to trigger when the value of the slider is changing.
 * @param {React.Component?} [props.icon]                  - Icon to show next to the label
 * @param {React.Component?} [props.help]                  - Help to show below the control.
 * @param {React.Component?} [props.label]                 - Label to show above component.
 * @param {React.Component[]?} [props.actions]             - Actions to show to the right of the label.
 * @param {React.Component?} [props.subtitle]              - Subtitle below the label.
 * @param {boolean} [props.disabled=false]                 - If `true`, the component is disabled.
 * @param {DotStyle} [props.marks=null]                    - Marks on the slider. Key represents the value of the slider, value determines what is shown. You can also use an object {label, value} for the displayed value to customize certain marks.  Won't have any effect if `dots` are enabled.
 * @param {boolean|number} [props.pushable=false]          - If `true`, the handles can push surrounding handles. If set to a number, the number defines the minimum distance between handles.
 * @param {boolean} [props.noCross=false]                  - If `true`, the handles of the ranges are not allowed to cross.
 * @param {boolean} [props.draggableTrack=false]           - If `true`, the track can be dragged to move all of the values together.
 * @param {function} [props.onAfterChange]                 - Function to trigger when the value of the slider is changed.
 * @param {string} [props.railColor]                       - Custom rail color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.trackColor]                      - Custom track color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.activeMarkColor]                 - Custom active mark color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.inactiveMarkColor]               - Custom inactive mark color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.handleColor]                     - Custom slider handle color. Should be a valid value of the CSS `background` property.
 * @param {string?} [props.additionalClass]                - If passed, the classes are appended to the base control.
 * @param {string?} [props.additionalSliderClass]          - If passed, the classes are appended to the slider.
 * @param {boolean} [props.noTooltip=false]                - If `true`, the tooltips are not shown when changing value.
 * @param {TooltipPosition} [props.tooltipPlacement='top'] - Defines where the tooltip is placed. If set to `hidden` no tooltip is shown.
 * @param {string} [props.tooltipFormat=(value)=>value]    - Defines how the tooltips are formatted. Should be in format `(value) => string` or `(value, isDragging) => string`.
 * @param {React.Component} [props.leftAddition]           - Component to display on the left of the slider.
 * @param {React.Component} [props.rightAddition]          - Component to display on the right of the slider.
 * @param {boolean} [props.inputField=false]               - If `true`, an input field is shown next to the slider. Can't be used with `valueDisplay`.
 * @param {boolean} [props.valueDisplay=false]             - If `true`, the current value is shown next to the slider. Can't be used with `hasInputField`.
 * @param {React.Component} [props.valueDisplayElement]    - If set and `valueDisplay` is enabled, sets the value display element that is used.
 */
export const RangeSlider = (props) => {
	const {
		// Basics
		min,
		max,
		step = 1,

		value,
		onChange,

		// Base control
		icon,
		help,
		label,
		actions,
		subtitle,

		// Behavior
		disabled,
		marks = null,

		onAfterChange,

		// Additions.
		leftAddition,
		rightAddition,
		inputField = false,

	} = props;

	return (
		<EsUicSlider
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={onChange}
			icon={icon}
			help={help}
			label={label}
			actions={actions}
			subtitle={subtitle}
			disabled={disabled}
			markers={marks}
			onChangeEnd={onAfterChange}
			inputField={inputField}
			before={leftAddition}
			after={rightAddition}
		/>
	);
};
