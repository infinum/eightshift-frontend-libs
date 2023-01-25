import React from 'react';
import { Responsive } from '@eightshift/frontend-libs/scripts';
import { Button } from '@wordpress/components';
import { classnames } from '../../helpers';

/**
 * A simple toggle button that allows changing values between breakpoints.
 *
 * @param {object} props                          - ResponsiveToggleButton options.
 * @param {React.Component?} [props.icon]         - Icon to show next to the label
 * @param {React.Component?} [props.label]        - Label to show above component.
 * @param {React.Component?} [props.subtitle]     - Subtitle below the label.
 * @param {React.Component?} [props.help]         - Help to show below the control.
 * @param {React.Component?} [props.buttonIcon]   - Icon to show inside the button.
 * @param {Object} [props.value]                  - Value to use - keys are breakpoint names.
 * @param {function} [props.onChange]             - Function to trigger when the value of is changing.
 * @param {any} [props.inheritValue]              - Value that marks something as inherited.
 * @param {function} [props.inheritCheck]         - Function that returns a `boolean`, used to decide whether a value is inherited or not.
 * @param {boolean?} [props.stringValues=false]   - If `true`, string values are returned instead of boolean.
 * @param {boolean?} [props.noBottomSpacing]      - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing] - If `true`, space below the control is reduced.
 * @param {string?} [props.additionalClasses]     - If passed, the classes are appended to the base control.
 * @param {Object} [props.additionalProps]        - If passed, the provided props are passed to the `Button`.
 */
export const ResponsiveToggleButton = (props) => {
	const {
		icon,
		label,
		subtitle,
		help,

		buttonIcon,

		value,
		onChange,

		inheritValue,
		inheritCheck = (value) => value === inheritValue,

		stringValues = false,

		noBottomSpacing,
		reducedBottomSpacing,

		additionalClasses,

		additionalProps = {},
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
			inline
			inheritButton={breakpointNames.map((breakpoint) => {
				const currentValue = rawValues[breakpoint];
				const isInherited = inheritCheck(currentValue);

				const defaultValue = stringValues ? `false` : false;

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

				const parsedValue = inheritCheck(currentValue) ? nearestValid : currentValue;

				const isActive = `${parsedValue}` === 'true';

				return (
					<div className='es-h-spaced' key={index}>
						<Button
							value={parsedValue}
							onClick={() => {
								onChange({
									...value,
									[breakpoint]: stringValues ? `${!(isActive ?? true)}` : !(isActive ?? true),
								});
							}}
							icon={buttonIcon}
							isPressed={isActive}
							className={classnames('es-has-v2-gutenberg-button-active-state es-slight-button-border es-button-square-32 es-button-icon-18 es-rounded-1! es-h-8! es-px-2!', isActive && 'is-active')}

							{...additionalProps}
						/>
					</div>
				);
			})}
		</Responsive>
	);
};
