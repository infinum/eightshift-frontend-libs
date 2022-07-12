import React from 'react';
import { useMemo } from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { TextControl } from '@wordpress/components';
import { getCustomHandle, getSliderComponent, getSliderStyles } from './shared';
import { CustomRangeSliderStyle } from './custom-slider-style';
import classnames from 'classnames';

/**
 * A modern and customizable custom slider.
 *
 * @param {object} props                                                              - CustomRangeSlider options.
 * @param {string} [props.className='']                                               - Additional CSS class.
 * @param {Number} [props.min=0]                                                      - Minimum value of the slider.
 * @param {Number} [props.max=0]                                                      - Maximum value of the slider.
 * @param {{Number: string}|{Number: {style, label}}} [props.marks={}]                - Marks on the slider. Key represents the value of the slider, value determines what is shown. You can also use an object {label, value} for the displayed value to customize certain marks.  Won't have any effect if `dots` are enabled.
 * @param {Number|null} [props.step=1]                                                - Value between slider steps. Must be greater than zero, `max` - `min` should be evenly divisible by the step value. If `marks` are set, you can set `step` to `null` to use `marks` as only steps.
 * @param {boolean} [props.vertical=false]                                            - If `true`, the slider is displayed vertically.
 * @param {boolean} [props.included=true]                                             - If `true`, the value interval is continuous, otherwise it's an independent value.
 * @param {boolean} [props.reverse=false]                                             - If `true`, the slider is displayed in reverse.
 * @param {boolean} [props.disabled=false]                                            - If `true`, the component is disabled.
 * @param {boolean} [props.dots=false]                                                - If `true` and the `step` is greater than `1`, dots will be rendered on the slider. Won't have any effect if `marks` are set.
 * @param {function} [props.onBeforeChange]                                           - Function to trigger when `ontouchstart` or `onmousedown` is triggered.
 * @param {function} [props.onChange]                                                 - Function to trigger when the value of the slider is changing.
 * @param {function} [props.onAfterChange]                                            - Function to trigger when `ontouchend` or `onmouseup` is triggered.
 * @param {Number[]} [props.defaultValue=[0,0]]                                       - Initial positions of handles.
 * @param {Number[]} [props.value]                                                    - Current positions of handles.
 * @param {Number[]} [props.tabIndex=0]                                               - Sets the `tabIndex` of each slider handle.
 * @param {string[]} [props.ariaLabelGroupForHandles]                                 - Sets the `aria-label` on each slider handle.
 * @param {string[]} [props.ariaLabelledByForHandle]                                  - Sets the `aria-labelledby` on each slider handle.
 * @param {callback[]} [props.ariaValueTextFormatterForHandle]                        - Sets the `aria-valuetext` on each slider handle. Should be in format `(value) => string`.
 * @param {string} [props.railColor]                                                  - Custom rail color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.trackColor]                                                 - Custom track color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.handleColor]                                                - Custom slider handle color. Should be a valid value of the CSS `background` property.
 * @param {React.Component} [props.leftAddition]                                      - Component to display on the left of the slider.
 * @param {React.Component} [props.rightAddition]                                     - Component to display on the right of the slider.
 * @param {string} [props.activeMarkColor]                                            - Custom active mark color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.inactiveMarkColor]                                          - Custom inactive mark color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.activeMarkLabelColor]                                       - Custom mark label color. Should be a valid value of the CSS `color` property.
 * @param {string} [props.inactiveMarkLabelColor]                                     - Custom inactive mark label color. Should be a valid value of the CSS `color` property.
 * @param {boolean} [props.isInline=false]                                            - If `true` and a `label` is set, the label and the slider are displayed inline.
 * @param {boolean} [props.hasInputFields=false]                                      - If `true`, input fields are shown next to the slider, one for each handle. Can't be used with `hasValueDisplay`.
 * @param {boolean} [props.hasCompactMarks=false]                                     - If `true` and `marks` are set, the marks are displayed on the slider rail directly.
 * @param {boolean} [props.hasValueDisplay=false]                                     - If `true`, the current value is shown next to the slider. Can't be used with `hasInputFields`.
 * @param {CustomRangeSliderStyle} [props.sliderStyle=CustomRangeSliderStyle.DEFAULT] - Sets the slider style.
 * @param {('top'|'bottom'|'hidden')} [props.tooltipPlacement='top']                  - Defines where the tooltip is placed. If set to `hidden` no tooltip is shown.
 * @param {string} [props.hasVerticalLabels=false]                                    - If `true` and `marks` are set, the labels of the marks are displayed vertically. Useful if the labels are longer and close together.
 * @param {string} [props.tooltipFormat=(value)=>value]                               - Defines how the tooltips are formatted. Should be in format `(value) => string` or `(value, isDragging) => string`.
 * @param {React.Component} [props.valueDisplayElement]                               - If set and `hasValueDisplay` is enabled, sets the value display element that is used.
 * @param {number} [props.count=1]                                                    - How many ranges to render.
 * @param {boolean} [props.allowCross=true]                                           - If `true`, the handles of the ranges are allowed to cross.
 * @param {boolean|number} [props.pushable=false]                                     - If `true`, the handles can push surrounding handles. If set to a number, the number defines the minimum distance between handles.
 * @param {boolean} [props.draggableTrack=false]                                      - If `true`, the track can be dragged to move all of the values together.
 * @param {string?} [props.label]                                                     - Label displayed above the control.
 * @param {string?} [props.help]                                                      - Help text displayed below the control.
 * @param {string?} [props.additionalClass]                                           - If passed, the classes are appended to the slider.
 */
export const CustomRangeSlider = (props) => {
	const {
		min,
		max,
		step,
		help,
		dots,
		marks,
		value,
		label,
		handle,
		vertical,
		onChange,
		disabled,
		railColor,
		trackColor,
		handleColor,
		leftAddition,
		rightAddition,
		additionalClass,
		activeMarkColor,
		inactiveMarkColor,
		activeMarkLabelColor,
		inactiveMarkLabelColor,

		isInline = false,
		hasInputFields = false,
		hasCompactMarks = false,
		hasValueDisplay = false,
		sliderStyle = CustomRangeSliderStyle.DEFAULT,
		tooltipPlacement = 'top',
		hasVerticalLabels = false,
		tooltipFormat = (value) => value,
		valueDisplayElement = (<span className='es-custom-slider-current-value'>{value.join(', ')}</span>),
	} = props;

	const Range = useMemo(() => createSliderWithTooltip(Slider.Range), []);

	const controlAdditionalStyles = useMemo(
		() => getSliderStyles({ trackColor, railColor, activeMarkColor, inactiveMarkColor, activeMarkLabelColor, inactiveMarkLabelColor, handleColor, vertical, marks, hasVerticalLabels, max }),
		[activeMarkColor, activeMarkLabelColor, handleColor, hasVerticalLabels, inactiveMarkColor, inactiveMarkLabelColor, marks, railColor, trackColor, vertical, max]
	);

	const sliderClass = useMemo(() => classnames([
		hasVerticalLabels ? 'es-custom-slider-vertical-labels' : '',
		sliderStyle === 'numberStrip' ? 'es-custom-slider-number-strip' : '',
		sliderStyle === 'columnPicker' || sliderStyle === 'columnPickerWithDots' ? 'es-custom-slider-column-picker' : '',
		sliderStyle === 'columnPickerWithDots' ? 'es-custom-slider-column-picker-with-dots' : '',
		isInline ? 'es-flex-between' : '',
		marks && hasCompactMarks && !dots ? 'es-custom-slider-compact-with-marks' : '',
		dots & !marks ? 'es-custom-slider-compact-with-dots' : '',
		additionalClass ?? '',
	]), [dots, hasCompactMarks, hasVerticalLabels, isInline, marks, sliderStyle, additionalClass]);

	const inputFieldElement = useMemo(() => (key) => (
		<TextControl
			key={key}
			type='number'
			value={value[key]}
			onChange={(v) => {
				let newValue = [...value];
				newValue[key] = v;

				onChange(newValue);
			}}
			hideLabelFromVision
			min={min}
			max={max}
			step={step}
			disabled={disabled}
		/>
	), [disabled, max, min, onChange, step, value]);

	const sliderElement = useMemo(() => (
		<div className='es-custom-slider-container' style={controlAdditionalStyles}>
			{leftAddition}
			<Range {...props} handle={handle ?? getCustomHandle({ tooltipPlacement, tooltipFormat })} />
			{rightAddition}
			{hasInputFields && !hasValueDisplay && Array.from({ length: value?.length ?? 2 }, (_, i) => inputFieldElement(i))}
			{!hasInputFields && hasValueDisplay && valueDisplayElement}
		</div>
	), [controlAdditionalStyles, handle, hasInputFields, hasValueDisplay, inputFieldElement, leftAddition, props, rightAddition, tooltipFormat, tooltipPlacement, value?.length, valueDisplayElement]);

	return getSliderComponent({ label, help, sliderElement, isInline, sliderClass });
};
