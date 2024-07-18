import React, { useRef, useLayoutEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Control } from '../base-control/base-control';
import { renderHandle } from './tooltip-handle';
import { generateMarkers, styleProps } from './shared';
import { icons } from '@eightshift/ui-components/icons';
import { AnimatedContentVisibility } from '../animated-content-visibility/animated-content-visibility';
import Slider from 'rc-slider';
import { NumberPicker } from '../number-picker/number-picker';
import { clsx } from '@eightshift/ui-components/utilities';

/**
 * A modern and customizable custom range slider.
 *
 * @typedef {null | 'dots' | true | {Number: string} | {Number: {style, label}}} DotStyle
 * @typedef {'top'|'bottom'|'hidden'} TooltipPosition
 *
 * @param {object} props                                   - RangeSlider options.
 * @param {Number} [props.min]                             - Minimum value of the slider.
 * @param {Number} [props.max]                             - Maximum value of the slider.
 * @param {Number|null} [props.step=1]                     - Value between slider steps. Must be greater than zero, `max` - `min` should be evenly divisible by the step value. If `marks` are set, you can set `step` to `null` to use `marks` as only steps.
 * @param {boolean} [props.discrete=false]                 - If `true`, the value interval is discrete (independent value), otherwise it's continuous.
 * @param {Number[]} [props.value]                         - Current value of the slider.
 * @param {function} [props.onChange]                      - Function to trigger when the value of the slider is changing.
 * @param {React.Component?} [props.icon]                  - Icon to show next to the label
 * @param {React.Component?} [props.help]                  - Help to show below the control.
 * @param {React.Component?} [props.label]                 - Label to show above component.
 * @param {React.Component[]?} [props.actions]             - Actions to show to the right of the label.
 * @param {React.Component?} [props.subtitle]              - Subtitle below the label.
 * @param {boolean?} [props.noBottomSpacing]               - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing]          - If `true`, space below the control is reduced.
 * @param {boolean} [props.reverse=false]                  - If `true`, the slider is displayed in reverse.
 * @param {boolean} [props.disabled=false]                 - If `true`, the component is disabled.
 * @param {DotStyle} [props.marks=null]                    - Marks on the slider. Key represents the value of the slider, value determines what is shown. You can also use an object {label, value} for the displayed value to customize certain marks.  Won't have any effect if `dots` are enabled.
 * @param {boolean|number} [props.pushable=false]          - If `true`, the handles can push surrounding handles. If set to a number, the number defines the minimum distance between handles.
 * @param {boolean} [props.noCross=false]                  - If `true`, the handles of the ranges are not allowed to cross.
 * @param {boolean} [props.draggableTrack=false]           - If `true`, the track can be dragged to move all of the values together.
 * @param {function} [props.onBeforeChange]                - Function to trigger when the value of the slider starts changing.
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
		discrete = false,

		value,
		onChange,

		// Base control
		icon,
		help,
		label,
		actions,
		subtitle,
		noBottomSpacing,
		reducedBottomSpacing,

		// Behavior
		reverse,
		disabled,
		marks = null,

		pushable = false,
		noCross = false,
		draggableTrack = false,

		onBeforeChange,
		onAfterChange,

		// Visual customization.
		handleColor,

		// Classes
		additionalClass,
		additionalSliderClass,

		// Tooltip
		noTooltip = false,
		tooltipPlacement = 'top',
		tooltipFormat = (value) => value,

		// Additions.
		leftAddition,
		rightAddition,
		inputField = false,

		valueDisplay = false,
		// eslint-disable-next-line max-len
		valueDisplayElement = ((v) => <span className='es-custom-slider-current-value es-display-inline-block es-p-1 es-rounded-1 es-border-cool-gray-100 es-bg-cool-gray-50 es-shadow-inner es-color-cool-gray-600 es-font-weight-500'>{v}</span>),
	} = props;

	const [inputFieldsVisible, setInputFieldsVisible] = useState(false);

	// Custom focus state capture to ensure proper focus visuals on the handle.
	const [hasFocus, setHasFocus] = useState(false);

	// Re-calculate height to take markers and other possible customizations into account (to prevent overlaps with other content).
	// The <div> wrapping the Slider is used to get the correct height.
	const [sliderHeight, setSliderHeight] = useState(14);
	const ref = useRef();

	useLayoutEffect(() => {
		const height = ref?.current?.scrollHeight;

		if (height && height >= 14) {
			setSliderHeight(height);
		}
	}, []);

	let marksDotsConfig = {};

	if (marks === 'dots') {
		marksDotsConfig = {
			marks: null,
			dots: true,
		};
	} else if (marks === true) {
		marksDotsConfig = {
			marks: generateMarkers(min, max, Math.max(step, 10)),
			dots: false,
		};
	} else {
		marksDotsConfig = {
			marks: marks,
			dots: false,
		};
	}

	return (
		<Control
			help={help}
			icon={icon}
			label={label}
			subtitle={subtitle}
			noBottomSpacing={noBottomSpacing}
			reducedBottomSpacing={reducedBottomSpacing}
			additionalClasses={additionalClass}
			actions={(valueDisplay || inputField || actions) &&
				<div className='es-h-spaced es-gap-1.5! es-has-v2-gutenberg-button-active-state-inside'>
					{actions}
					{inputField &&
						<Button
							onClick={() => setInputFieldsVisible(!inputFieldsVisible)}
							icon={icons.textBoxEdit}
							isPressed={inputFieldsVisible}
							className='es-button-square-28 es-button-icon-22 es-rounded-1! es-slight-button-border'
							label={
								inputFieldsVisible
									? __('Hide input fields', 'eightshift-frontend-libs')
									: __('Show input fields', 'eightshift-frontend-libs')
							}
							showTooltip
						/>
					}

					{valueDisplay &&
						<div className='es-h-spaced es-gap-0.5!'>
							{value.map((v) => valueDisplayElement(v))}
						</div>
					}
				</div>
			}
		>
			<div className={clsx('es-h-between es-gap-3! es-mt-3', marks && 'es-items-start!')}>
				{leftAddition}

				<div ref={ref} className='es-flex-1'>
					<Slider
						range

						reverse={reverse}
						disabled={disabled}

						value={value}

						min={min}
						max={max}
						step={step}

						onChange={onChange}
						included={!discrete}

						pushable={pushable}
						allowCross={!noCross}
						draggableTrack={draggableTrack}

						handleRender={noTooltip ? null : renderHandle({ tooltipPlacement: tooltipPlacement, tooltipFormat: tooltipFormat, hasFocus: hasFocus })}

						{...marksDotsConfig}

						onFocus={({ target }) => {
							const calculateHandleColor = (input) => {
								if (!input) {
									return 'var(--wp-admin-theme-color, var(--es-admin-accent-color-default))';
								}

								if (!input.includes('gradient')) {
									return input;
								}

								const splitInput = input.split(',');

								if (splitInput.length === 2) {
									return splitInput[0].slice(splitInput[0].indexOf('(') + 1).trim();
								}

								const splitInput2 = splitInput[1].trim().split(' ');

								if (splitInput2.length > 1) {
									return splitInput2[0].trim();
								}

								return splitInput2[0].trim();
							};

							// eslint-disable-next-line max-len
							target.style.setProperty('--es-custom-slider-handle-shadow', `0 0 0 1px white, 0 0 0 4px rgb(255 255 255 / 0.8), 0 0 0 4px ${calculateHandleColor(handleColor)}`);
							setHasFocus(true);
						}}

						onBlur={({ target }) => {
							target.style.removeProperty('--es-custom-slider-handle-shadow');
							setHasFocus(false);
						}}

						{...styleProps(props, sliderHeight, true)}

						onBeforeChange={onBeforeChange}
						onAfterChange={onAfterChange}

						className={classnames(additionalSliderClass)}
					/>
				</div>

				{rightAddition}
			</div>

			{inputField &&
				<AnimatedContentVisibility showIf={inputFieldsVisible} additionalContainerClasses='es-h-center es-pt-3'>
					{value.map((v, i) => (
						<NumberPicker
							key={i}
							min={min}
							max={max}
							step={step}
							value={v}
							onChange={(v) => {
								let currentValue = [...value];
								currentValue[i] = v;

								onChange(currentValue);
							}}
							disabled={disabled}
							fixedWidth={`${max}`.length}
							noBottomSpacing
						/>
					))}
				</AnimatedContentVisibility>
			}
		</Control>
	);
};
