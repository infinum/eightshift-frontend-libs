import React from 'react';
import { Responsive, icons, Slider } from '@eightshift/frontend-libs/scripts';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { classnames } from '../../helpers';

/**
 * A `Slider` that allows changing values between breakpoints.
 *
 * @param {object} props                          - ResponsiveSlider options.
 * @param {React.Component?} [props.icon]         - Icon to show next to the label
 * @param {React.Component?} [props.label]        - Label to show above component.
 * @param {React.Component?} [props.subtitle]     - Subtitle below the label.
 * @param {React.Component?} [props.help]         - Help to show below the control.
 * @param {Object} [props.value]                  - Value to use - keys are breakpoint names.
 * @param {function} [props.onChange]             - Function to trigger when the value of is changing.
 * @param {Number?} [props.min=0]                 - Minimum allowed value.
 * @param {Number} [props.max]                    - Maximum allowed value.
 * @param {Number?} [props.step=1]                - Step for each change.
 * @param {any} [props.inheritValue]              - Value that marks something as inherited.
 * @param {function} [props.inheritCheck]         - Function that returns a `boolean`, used to decide whether a value is inherited or not.
 * @param {Number?} [props.resetButton]           - If provided, a button to reset to the given value is shown.
 * @param {boolean?} [props.stringValues=false]   - If `true`, string values are returned instead of numbers.
 * @param {boolean?} [props.noBottomSpacing]      - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing] - If `true`, space below the control is reduced.
 * @param {string?} [props.additionalClasses]     - If passed, the classes are appended to the base control.
 * @param {Object} [props.additionalProps]        - If passed, the provided props are passed to the `Slider`.
 * @param {function} [props.modifyInput]          - If passed, the input to the `NumberPicker` is modified with this function.
 * @param {function} [props.modifyOutput]         - If passed, the output from the `NumberPicker` is modified with this function.
 * @param {Number} [props.responsiveDefaultValue] - If passed, instead of using `min` this value is set when un-inheriting a breakpoint value.
 */
export const ResponsiveSlider = (props) => {
	const {
		icon,
		label,
		subtitle,
		help,

		value,
		onChange,

		min = 0,
		max,
		step = 1,

		inheritValue,
		inheritCheck = (value) => value === inheritValue,

		resetButton,

		stringValues = false,

		noBottomSpacing,
		reducedBottomSpacing,

		additionalClasses,

		additionalProps = {},

		modifyInput,
		modifyOutput,

		responsiveDefaultValue = min,
	} = props;

	const breakpointNames = Object.keys(value);

	const rawValues = Object.entries(value).reduce((all, [breakpointName, value]) => ({
		...all,
		[breakpointName]: value,
	}), {});

	return (
		<Responsive
			label={label}
			icon={icon}
			subtitle={subtitle}
			help={help}
			noBottomSpacing={noBottomSpacing}
			reducedBottomSpacing={reducedBottomSpacing}
			additionalClasses={additionalClasses}
			inheritButton={breakpointNames.map((breakpoint) => {
				const currentValue = rawValues[breakpoint];
				const isInherited = inheritCheck(currentValue);

				const rawDefaultValue = stringValues ? `${responsiveDefaultValue}` : responsiveDefaultValue;
				const defaultValue = modifyInput ? modifyInput(rawDefaultValue) : rawDefaultValue;

				return {
					callback: () => {
						onChange({
							...value,
							[breakpoint]: isInherited ? defaultValue : inheritValue,
						});
					},
					isActive: isInherited,
				};
			})}
		>
			{breakpointNames.map((breakpoint, index) => {
				const currentValue = rawValues[breakpoint];

				const isInherited = inheritCheck(value);

				const getNearest = () => {
					for (let i = index - 1; i >= 0; i--) {
						const breakpointName = breakpointNames[i];

						const current = value[breakpointName];

						if (current) {
							return current;
						}
					}

					return inheritValue;
				};

				const nearestValid = getNearest();

				const parsedValue = parseFloat(inheritCheck(currentValue) ? nearestValid : currentValue);

				return (
					<div className='es-h-spaced' key={index}>
						<Slider
							value={modifyInput ? modifyInput(parsedValue) : parsedValue}
							onChange={(currentValue) => {
								const newValue = stringValues ? `${currentValue}` : currentValue;
								onChange({
									...value,
									[breakpoint]: modifyOutput ? modifyOutput(newValue) : newValue,
								});
							}}
							marks
							inputField
							noBottomSpacing
							min={min}
							max={max}
							step={step}
							additionalClass='es-w-full'
							rightAddition={typeof resetButton !== 'undefined' &&
								<Button
									icon={resetButton === 0 ? icons.resetToZero : icons.reset}
									onClick={() => {
										const newValue = stringValues ? `${resetButton}` : resetButton;
										onChange({
											...value,
											[breakpoint]: modifyOutput ? modifyOutput(newValue) : newValue,
										});
									}}
									disabled={parsedValue === resetButton || isInherited}
									className={classnames('es-button-square-32 es-button-icon-24 es-slight-button-border-cool-gray-400 es-hover-slight-button-border-cool-gray-500 es-rounded-1! es-flex-shrink-0!', (parsedValue === resetButton || isInherited) && 'es-pointer-events-none es-nested-color-cool-gray-400!')}
									label={__('Reset', 'eightshift-frontend-libs')}
									showTooltip
								/>
							}
							{...additionalProps}
						/>
					</div>
				);
			})}
		</Responsive>
	);
};
