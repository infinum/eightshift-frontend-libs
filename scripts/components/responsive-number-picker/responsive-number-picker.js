import React from 'react';
import { Responsive, NumberPicker } from '@eightshift/frontend-libs/scripts';
import { icons } from '@eightshift/ui-components/icons';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { classnames } from '../../helpers';

/**
 * A simple `NumberPicker` that allows changing values between breakpoints.
 *
 * @param {object} props                          - ResponsiveNumberPicker options.
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
 * @param {Object} [props.additionalProps]        - If passed, the provided props are passed to the `NumberPicker`.
 * @param {function} [props.modifyInput]          - If passed, the input to the `NumberPicker` is modified with this function.
 * @param {function} [props.modifyOutput]         - If passed, the output from the `NumberPicker` is modified with this function.
 * @param {Number} [props.responsiveDefaultValue] - If passed, instead of using `min` this value is set when un-inheriting a breakpoint value.
 */
export const ResponsiveNumberPicker = (props) => {
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

	const fieldWidth = Math.max(`${Math.abs(max)}`.length, `${Math.abs(min)}`.length);

	return (
		<Responsive
			label={label}
			icon={icon}
			subtitle={subtitle}
			help={help}
			noBottomSpacing={noBottomSpacing}
			reducedBottomSpacing={reducedBottomSpacing}
			additionalClasses={additionalClasses}
			inline
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
					<NumberPicker
						key={index}
						value={modifyInput ? modifyInput(parsedValue) : parsedValue}
						onChange={(currentValue) => {
							const newValue = stringValues ? `${currentValue}` : currentValue;
							onChange({
								...value,
								[breakpoint]: modifyOutput ? modifyOutput(newValue) : newValue,
							});
						}}
						noBottomSpacing
						fixedWidth={fieldWidth}
						min={min}
						max={max}
						step={step}
						extraButton={typeof resetButton !== 'undefined' &&
							<Button
								icon={resetButton === 0 ? icons.resetToZero : icons.reset}
								onClick={() => {
									const newValue = stringValues ? `${resetButton}` : resetButton;
									onChange({
										...value,
										[breakpoint]: modifyOutput ? modifyOutput(newValue) : newValue,
									});
								}}
								disabled={(modifyInput ? modifyInput(parsedValue) : parsedValue) === resetButton || isInherited}
								className={classnames(
									// eslint-disable-next-line max-len
									'es-size-7! es-min-size-0! es-p-0! es-button-icon-20 es-rounded-1! es-hover-bg-cool-gray-100 es-transition',
									(parsedValue === resetButton || isInherited) && 'es-pointer-events-none es-nested-color-cool-gray-400!'
								)}
								label={__('Reset', 'eightshift-frontend-libs')}
								showTooltip
							/>
						}
						{...additionalProps}
					/>
				);
			})}
		</Responsive>
	);
};
