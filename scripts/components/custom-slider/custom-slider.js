import Slider, { SliderTooltip, Handle } from 'rc-slider';
import { BaseControl, TextControl } from '@wordpress/components';
import classnames from 'classnames';
import './custom-slider.scss';

/**
 * CustomSlider style.
 *
 * @param {string} DEFAULT - The default slider.
 */
 export const CustomSliderStyle = {
	DEFAULT: 'default',
};

/**
 * A modern and customizable custom slider.
 *
 * @param {object} props                                                    - CustomSlider options.
 * @param {string} [props.className='']                                     - Additional CSS class.
 * @param {Number} [props.min=0]                                            - Minimum value of the slider.
 * @param {Number} [props.max=0]                                            - Maximum value of the slider.
 * @param {{Number: string}|{Number: {style, label}}} [props.marks={}]      - Marks on the slider. Key represents the value of the slider, value determines what is shown. You can also use an object {label, value} for the displayed value to customize certain marks.  Won't have any effect if `dots` are enabled.
 * @param {Number|null} [props.step=1]                                      - Value between slider steps. Must be greater than zero, `max` - `min` should be evenly divisible by the step value. If `marks` are set, you can set `step` to `null` to use `marks` as only steps.
 * @param {boolean} [props.vertical=false]                                  - If `true`, the slider is displayed vertically.
 * @param {boolean} [props.included=true]                                   - If `true`, the value interval is continuous, otherwise it's an independent value.
 * @param {boolean} [props.reverse=false]                                   - If `true`, the slider is displayed in reverse.
 * @param {boolean} [props.disabled=false]                                  - If `true`, the component is disabled.
 * @param {boolean} [props.dots=false]                                      - If `true` and the `step` is greater than `1`, dots will be rendered on the slider. Won't have any effect if `marks` are set.
 * @param {function} [props.onBeforeChange]                                 - Function to trigger when `ontouchstart` or `onmousedown` is triggered.
 * @param {function} [props.onChange]                                       - Function to trigger when the value of the slider is changing.
 * @param {function} [props.onAfterChange]                                  - Function to trigger when `ontouchend` or `onmouseup` is triggered.
 * @param {Number} [props.defaultValue=0]                                   - Initial value of the slider.
 * @param {Number} [props.value]                                            - Current value of the slider.
 * @param {Number} [props.startPoint=undefined]                             - Determines starting point of the slider track. If `undefined`, value of `min` is used.
 * @param {Number} [props.tabIndex=0]                                       - Sets the `tabIndex` of the slider handle.
 * @param {string?} [props.ariaLabelForHandle]                              - Sets the `arial-label` on the slider handle.
 * @param {string?} [props.ariaLabelledByForHandle]                         - Sets the `arial-labelledby` on the slider handle.
 * @param {callback} [props.ariaValueTextFormatterForHandle]                - Sets the `arial-valuetext` on the slider handle. Should be in format `(value) => string`.
 * @param {string} [props.railColor]                                        - Custom rail color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.trackColor]                                       - Custom track color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.handleColor]                                      - Custom slider handle color. Should be a valid value of the CSS `background` property.
 * @param {React.Component} [props.leftAddition]                            - Component to display on the left of the slider.
 * @param {React.Component} [props.rightAddition]                           - Component to display on the right of the slider.
 * @param {string} [props.activeMarkColor]                                  - Custom active mark color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.inactiveMarkColor]                                - Custom inactive mark color. Should be a valid value of the CSS `background` property.
 * @param {string} [props.activeMarkLabelColor]                             - Custom mark label color. Should be a valid value of the CSS `color` property.
 * @param {string} [props.inactiveMarkLabelColor]                           - Custom inactive mark label color. Should be a valid value of the CSS `color` property.
 * @param {boolean} [props.isInline=false]                                  - If `true` and a `label` is set, the label and the slider are displayed inline.
 * @param {boolean} [props.hasInputField=false]                             - If `true`, an input field is shown next to the slider. Can't be used with `hasValueDisplay`.
 * @param {boolean} [props.hasCompactMarks=false]                           - If `true` and `marks` are set, the marks are displayed on the slider rail directly.
 * @param {boolean} [props.hasValueDisplay=false]                           - If `true`, the current value is shown next to the slider. Can't be used with `hasInputField`.
 * @param {CustomSliderStyle} [props.sliderStyle=CustomSliderStyle.DEFAULT] - Sets the slider style.
 * @param {('top'|'bottom'|'hidden')} [props.tooltipPlacement='top']        - Defines where the tooltip is placed. If set to `hidden` no tooltip is shown.
 * @param {string} [props.hasVerticalLabels=false]                          - If `true` and `marks` are set, the labels of the marks are displayed vertically. Useful if the labels are longer and close together.
 * @param {string} [props.tooltipFormat=(value)=>value]                     - Defines how the tooltips are formatted. Should be in format `(value) => string` or `(value, isDragging) => string`.
 * @param {React.Component} [props.valueDisplayElement]                     - If set and `hasValueDisplay` is enabled, sets the value display element that is used.
 * @param {string?} [props.label]                                           - Label displayed above the control.
 * @param {string?} [props.help]                                            - Help text displayed below the control.
 */
export const CustomSlider = (props) => {
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
		activeMarkColor,
		inactiveMarkColor,
		activeMarkLabelColor,
		inactiveMarkLabelColor,

		isInline = false,
		hasInputField = false,
		hasCompactMarks = false,
		hasValueDisplay = false,
		sliderStyle = 'default',
		tooltipPlacement = 'top',
		hasVerticalLabels = false,
		tooltipFormat = (value) => value,
		valueDisplayElement = (<span className='es-custom-slider-current-value'>{value}</span>),
	} = props;

	const controlAdditionalStyles = {};

	if (trackColor) {
		controlAdditionalStyles['--es-custom-slider-custom-track-color'] = trackColor;
	}

	if (railColor) {
		controlAdditionalStyles['--es-custom-slider-custom-rail-color'] = railColor;
	}

	if (activeMarkColor) {
		controlAdditionalStyles['--es-custom-slider-custom-active-mark-color'] = activeMarkColor;
	}

	if (inactiveMarkColor) {
		controlAdditionalStyles['--es-custom-slider-custom-mark-color'] = inactiveMarkColor;
	}

	if (activeMarkLabelColor) {
		controlAdditionalStyles['--es-custom-slider-custom-active-mark-label-color'] = activeMarkLabelColor;
	}

	if (inactiveMarkLabelColor) {
		controlAdditionalStyles['--es-custom-slider-custom-mark-label-color'] = inactiveMarkLabelColor;
	}

	if (handleColor) {
		controlAdditionalStyles['--es-custom-slider-custom-handle-color'] = handleColor;
	}

	if (vertical) {
		controlAdditionalStyles['flexDirection'] = 'column';
		
		if (marks) {
			controlAdditionalStyles['--es-custom-slider-vertical-mark-offset'] = ([...Object.keys(marks)]?.length ?? 0) % 2 === 0 ? '-0.5rem' : '0.25rem';
		}
	}

	if (hasVerticalLabels) {
		const maxLabelLength = Math.max(...Object.values(marks).map((i) => parseInt(i?.length ?? 0)));

		controlAdditionalStyles['--es-custom-slider-additional-bottom-padding'] = maxLabelLength * 0.25;
	}

	const customHandle = (props) => {
		const { value, dragging, index, ...restProps } = props;

		if (tooltipPlacement === 'hide') {
			return (<Handle value={value} {...restProps} />);
		}

		return (
			<SliderTooltip
				prefixCls='rc-slider-tooltip'
				overlay={tooltipFormat(value, dragging)}
				visible={dragging}
				placement={tooltipPlacement}
				key={index}
			>
				<Handle value={value} {...restProps} />
			</SliderTooltip>
		);
	};

	const sliderClass = classnames([
		hasVerticalLabels ? 'es-custom-slider-vertical-labels' : '',
		sliderStyle === 'number-strip' ? 'es-custom-slider-number-strip' : '',
		isInline ? 'es-flex-between' : '',
		marks && hasCompactMarks && !dots ? 'es-custom-slider-compact-with-marks' : '',
		dots & !marks ? 'es-custom-slider-compact-with-dots' : '',
	]);

	const inputFieldElement = (
		<TextControl
			type='number'
			value={value}
			onChange={onChange}
			hideLabelFromVision
			min={min}
			max={max}
			step={step}
			disabled={disabled}
		/>
	);

	const sliderElement = (
		<div className='es-custom-slider-container' style={controlAdditionalStyles}>
			{leftAddition}
			<Slider {...props} handle={handle ?? customHandle} />
			{rightAddition}
			{hasInputField && !hasValueDisplay && inputFieldElement}
			{!hasInputField && hasValueDisplay && valueDisplayElement}
		</div>
	);

	if (!label && !help) {
		return sliderElement;
	}

	if (isInline && label) {
		return (
			<div className={sliderClass}>
				{typeof label === 'string' &&
					<p className='es-custom-slider-inline-label'>{label}</p>
				}
				{typeof label !== 'string' && label}
				{sliderElement}
			</div>
		);
	}

	return (
		<BaseControl
			label={label}
			help={help}
			className={sliderClass}
		>
			{sliderElement}
		</BaseControl>
	);
};
