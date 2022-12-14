import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { checkAttr, Responsive, CustomSlider, getAttrKey, getOption, IconLabel, icons, getDefaultBreakpointNames } from '@eightshift/frontend-libs/scripts';

/**
 * A responsive slider to set spacings.
 *
 * @param {object} props                                       - SpacingSlider options.
 * @param {Object} props.manifest                              - The component/block manifest.
 * @param {Object} props.attributes                            - Attributes of the current component/block.
 * @param {string} props.attributeName                         - Attribute name you want to change.
 * @param {callback} props.setAttributes                       - The `setAttributes` callback from the component/block.
 * @param {React.Component?} [props.icon]                      - Icon to add meaning to the option.
 * @param {React.Component?} [props.label]                     - Description of the option.
 * @param {React.Component?} [props.help]                      - Help provided with the option.
 * @param {boolean?} [props.hasInputField=true]                - If `true`, an input box is shown to allow fine-tuning the input value.
 * @param {boolean?} [props.hasValueDisplay=false]             - If `true`, the input value is displayed on the right.
 * @param {boolean?} [props.showResetButton=true]              - If `true`, a 'reset' button is shown next to the slider (sets the value to the provided `resetValue` or the reset value from the option).
 * @param {boolean?} [props.showDisableButton=false]           - If `true`, a 'clear' button is shown next to the default breakpoint slider (clears the value by setting it to '').
 * @param {boolean?} [props.showMarks=true]                    - If `true`, marks are shown on the slider, in divisions of 5.
 * @param {Array<string>?} [props.breakpointNames]             - Breakpoint names to process, by default taken from Global manifest.
 * @param {{min, max, step}} [props.minMaxStep]                - Provides the min, max and step value for the slider.
 * @param {string?} [props.minMaxStepOptionName=attributeName] - If specified, the given name is used to fetch the min/max/step from manifest. By default the same as `attributeName`.
 * @param {any?} [props.defaultValue=0]                        - The `defaultValue` provided to `CustomSlider`, shown when the value is `undefined`.
 * @param {number?} [props.markSteps=5]                        - Defines space between steps of marks.
 * @param {any?} [props.resetValue]                            - The value to reset to, if not provided either the manifest responsive default value is used, or if that's not present no reset button is shown.
 * @param {function?} [props.processValue]                     - Processes the value before passing it to the slider.
 * @param {function?} [props.processBeforeSetAttr]             - Processes the value before passing it to setAttributes.
 * @param {function?} [props.processResetValue]                - Processes the reset value before passing it to setAttributes.
 * @param {function?} [props.valueDisplayFormat]               - If provided, replaces the default value formatting function.
 * @param {object?} [props.customProps]                        - If provided, props are passed to the slider.
 */
export const SpacingSlider = (props) => {
	const {
		icon,
		label,
		help,
		showResetButton = true,
		showDisableButton = false,
		showMarks = true,
		hasInputField = true,
		hasValueDisplay = false,
		valueDisplayFormat = (v) => v,

		breakpointNames = getDefaultBreakpointNames(),

		manifest,
		attributes,
		attributeName,
		setAttributes,
		minMaxStepOptionName = attributeName,
		minMaxStep,
		defaultValue = 0,
		resetValue,
		markSteps = 5,

		processValue = (v) => v,
		processBeforeSetAttr = (v) => v,
		processResetValue = (v) => v,

		customProps,
		compensateForRemBase10 = false,
		disableWithUndefined = false,
		isNumeric = false,
	} = props;

	const {
		attributes: manifestAttributes,
		responsiveAttributes: manifestResponsiveAttributes,
	} = manifest;

	return (
		<Responsive
			label={<IconLabel icon={icon} label={label} />}
			breakpoints={breakpointNames}
			help={help}
			inheritButton={breakpointNames.map((breakpoint) => {
				const { [attributeName]: attrNames } = manifestResponsiveAttributes;
				const breakpointAttrName = attrNames[breakpoint];
				const breakpointAttrValue = checkAttr(breakpointAttrName, attributes, manifest);

				const { min } = minMaxStep ?? getOption(minMaxStepOptionName, attributes, manifest);

				const isInherited = typeof breakpointAttrValue === 'undefined' || breakpointAttrValue?.length === 0;

				return {
					callback: () => setAttributes({ [getAttrKey(breakpointAttrName, attributes, manifest)]: isInherited ? (resetValue ?? manifestAttributes[breakpointAttrName]?.default ?? min) : undefined }),
					isActive: isInherited,
				};
			})}
		>
			{breakpointNames.map((breakpoint, index) => {
				const { [attributeName]: attrNames } = manifestResponsiveAttributes;
				const breakpointAttrName = attrNames[breakpoint];
				const breakpointAttrValue = checkAttr(breakpointAttrName, attributes, manifest) * (compensateForRemBase10 ? 10 : 1);

				const { min, max, step } = minMaxStep ?? getOption(minMaxStepOptionName, attributes, manifest);

				const numOfMarks = Math.round((max - min) / markSteps);
				const remainder = ((max - min) % markSteps) === 0 ? 1 : 0;

				const restOfMarks = [...Array((min < 0 ? numOfMarks / 2 : numOfMarks)).keys()]
					.reduce((original, i) => {
						return ({
							...original,
							[((min < 0 ? 0 : min) + i + remainder) * markSteps]: ((min < 0 ? 0 : min) + i + remainder) * markSteps,
						});
					}, {});

				let marks = { ...restOfMarks };

				if (showMarks) {
					if (min === 0) {
						marks = {
							0: 0,
							...restOfMarks,
						};
					}

					if (min > 0 && min < parseInt(Object.keys(restOfMarks)[0])) {
						marks = {
							[min]: min,
							...restOfMarks,
						};
					}

					if (max && typeof marks[max] === 'undefined') {
						marks[max] = max;
					}

					if (min < 0) {
						const restOfNegativeMarks = [...Array(numOfMarks / 2).keys()]
							.reduce((original, i) => {
								return ({
									...original,
									[-1 * ((min < 0 ? 0 : min) + i + remainder) * markSteps]: -1 * ((min < 0 ? 0 : min) + i + remainder) * markSteps,
								});
							}, {});
						marks = {
							...restOfNegativeMarks,
							0: 0,
							...marks,
						};
					}
				}

				return (
					<div className={index !== 0 ? 'es-mb-4' : 'es-mb-2'} key={index}>
						<CustomSlider
							value={processValue(breakpointAttrValue)}
							onChange={(value) => setAttributes({ [getAttrKey(breakpointAttrName, attributes, manifest)]: processBeforeSetAttr(value / (compensateForRemBase10 ? 10 : 1)) })}
							min={min}
							max={max}
							step={step}
							marks={marks}
							hasInputField={hasInputField}
							hasValueDisplay={hasValueDisplay}
							valueDisplayElement={(<span style={{ '--es-custom-slider-value-display-width': (valueDisplayFormat(max)?.toString()?.trim()?.length ?? 3) }} className='es-custom-slider-current-value'>{valueDisplayFormat(processValue(breakpointAttrValue))}</span>)}
							defaultValue={defaultValue}
							hasCompactMarks
							rightAddition={
								<>
									{(showResetButton || showDisableButton) &&
										<div className='es-v-center es-gap-0! -es-mr-2'>
											{showResetButton && (typeof resetValue !== 'undefined' || typeof manifestAttributes[breakpointAttrName]?.default !== 'undefined') &&
												<Button
													isSmall
													className='es-button-square-24 es-button-icon-18'
													icon={icons.reset}
													showTooltip
													label={__('Reset to initial value', 'eightshift-frontend-libs')}
													onClick={() => setAttributes({ [getAttrKey(breakpointAttrName, attributes, manifest)]: processResetValue(resetValue ?? manifestAttributes[breakpointAttrName]?.default) })}
													disabled={breakpointAttrValue === manifestAttributes[breakpointAttrName]?.default}
												/>
											}

											{showDisableButton && index === 0 &&
												<Button
													isSmall
													className='es-button-square-24 es-button-icon-18'
													icon={icons.clear}
													showTooltip
													label={__('Clear', 'eightshift-frontend-libs')}
													onClick={() => setAttributes({ [getAttrKey(breakpointAttrName, attributes, manifest)]: disableWithUndefined ? undefined : '' })}
													disabled={typeof breakpointAttrValue === 'undefined' || breakpointAttrValue?.length === 0 || (isNumeric && (isNaN(breakpointAttrValue) || breakpointAttrValue < min || breakpointAttrValue > max))}
												/>
											}
										</div>
									}
								</>
							}
							{...customProps}
						/>
					</div>
				);
			})}
		</Respon>
	);
};
