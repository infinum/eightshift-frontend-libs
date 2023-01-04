import React from 'react';
import { Responsive, IconLabel, icons } from '@eightshift/frontend-libs/scripts';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { ColumnConfigSlider } from '../custom-slider/column-config-slider';

/**
 * A modern and customizable custom slider.
 *
 * @typedef {null | 'dots' | true | {Number: string} | {Number: {style, label}}} DotStyle
 * @typedef {'top'|'bottom'|'hidden'} TooltipPosition
 *
 * @param {object} props                           - WidthOffsetRangeSlider options.
 * @param {React.Component?} [props.icon]          - Icon to show next to the label
 * @param {React.Component?} [props.label]         - Label to show above component.
 * @param {Object} [props.value]                   - Value to use - keys are breakpoint names, values are `width`, `offset`, `fullWidth`.
 * @param {function} [props.onChange]              - Function to trigger when the value of is changing.
 * @param {any} [props.inheritValue]               - Value that marks something as inherited.
 * @param {function} [props.inheritCheck]          - Function that returns a `boolean`, used to decide whether a value is inherited or not.
 * @param {boolean} [props.fullWidthToggle=false]  - If `true`, the "Fullwidth" toggle is shown.
 * @param {boolean} [props.autoOffsetToggle=false] - If `true`, the "Automatic offset" toggle is shown.
 * @param {any} [props.autoOffsetValue]            - Value that marks automatic offset.
 * @param {boolean?} [props.noBottomSpacing=false] - If `true`, space below the control is removed.
 * @param {string?} [props.additionalClasses]      - If passed, the classes are appended to the base control.
 * @param {boolean?} [props.numericValues=false]   - If `true`, numeric values are returned instead of strings. Not compatible with `autoOffsetToggle`.
 * @param {Number} [props.totalNumberOfColumns=12] - Available number of columns to show.
 */
export const WidthOffsetRangeSlider = (props) => {
	const {
		icon = icons.positioningWidthGuide,
		label = __('Width & offset', 'eightshift-frontend-libs'),

		value,
		onChange,

		inheritValue,
		inheritCheck = (value) => value === inheritValue,

		fullWidthToggle = false,

		autoOffsetToggle = false,
		autoOffsetValue = 'auto',

		noBottomSpacing = false,
		additionalClasses,

		numericValues = false,

		totalNumberOfColumns: rawTotalColumns = 12,
	} = props;

	const stringValues = !numericValues || autoOffsetToggle;

	const breakpointNames = Object.keys(value);

	const rawWidths = Object.entries(value).reduce((all, [breakpointName, { width }]) => ({
		...all,
		[breakpointName]: width,
	}), {});

	const rawOffsets = Object.entries(value).reduce((all, [breakpointName, { offset }]) => ({
		...all,
		[breakpointName]: offset,
	}), {});

	const rawFullWidths = fullWidthToggle && Object.entries(value).reduce((all, [breakpointName, { fullWidth }]) => ({
		...all,
		[breakpointName]: fullWidth,
	}), {});

	const buttonClass = 'es-has-v2-gutenberg-button-active-state es-slight-button-border es-button-icon-18 es-button-no-icon-spacing es-gap-1.5! es-rounded-1! es-h-8! es-px-2!';

	return (
		<Responsive label={label} icon={icon} noBottomSpacing={noBottomSpacing} additionalClasses={additionalClasses} addSpaceWhenOpen>
			{breakpointNames.map((breakpoint, index) => {
				const width = rawWidths[breakpoint];
				const offset = rawOffsets[breakpoint];
				const fullWidth = rawFullWidths?.[breakpoint];

				const isWidthInherited = inheritCheck(width);
				const isOffsetInherited = inheritCheck(offset);

				const getNearest = (attributeName) => {
					for (let i = index - 1; i >= 0; i--) {
						const breakpointName = breakpointNames[i];

						const current = value[breakpointName][attributeName];

						if (autoOffsetToggle && current === autoOffsetValue) {
							return 1;
						}

						if (current) {
							return current;
						}
					}

					return inheritValue;
				};

				const nearestValidFullWidth = getNearest('fullWidth');
				const nearestValidOffset = getNearest('offset');
				const nearestValidWidth = getNearest('width');

				const parsedOffset = autoOffsetToggle && (inheritCheck(offset) ? nearestValidOffset : offset) === autoOffsetValue ? 1 : parseInt(inheritCheck(offset) ? nearestValidOffset : offset );
				const parsedWidth = parseInt(inheritCheck(width) ? nearestValidWidth : width);
				const parsedFullWidth = inheritCheck(fullWidth) ? nearestValidFullWidth : fullWidth;

				const displayedWidth = parsedWidth + parsedOffset;

				const totalNumberOfColumns = rawTotalColumns + (parsedFullWidth === true ? 2 : 0);

				return (
					<ColumnConfigSlider
						key={breakpoint}
						noBottomSpacing={noBottomSpacing}
						numOfColumns={totalNumberOfColumns}
						value={[parsedOffset, displayedWidth]}
						onChange={([o, w]) => {
							let newValues = {};

							if (isWidthInherited && !isOffsetInherited) {
								newValues.offset = stringValues ? String(o) : o;
							} else if (!isWidthInherited && isOffsetInherited || offset === autoOffsetValue) {
								newValues.width = stringValues ? String(w - nearestValidOffset) : w - nearestValidOffset;
							} else if (!isWidthInherited && !isOffsetInherited) {
								newValues.width = stringValues ? String(w - o) : w - o;
								newValues.offset = stringValues ? String(o) : o;
							}

							onChange({
								...value,
								[breakpoint]: {
									...value[breakpoint],
									...newValues,
								}
							});
						}}
						noWidthHandle={inheritCheck(width)}
						noOffsetHandle={inheritCheck(offset) || (index === 0 && offset === autoOffsetValue)}
						additionalControlsAbove={ !((fullWidthToggle && (index === 0 || !inheritCheck(fullWidth))) || (autoOffsetToggle && index === 0)) ? null :
							<>
								{fullWidthToggle && (index === 0 || !inheritCheck(fullWidth)) &&
									<Button
										isPressed={parsedFullWidth}
										onClick={() => {
											onChange({
												...value,
												[breakpoint]: {
													...value[breakpoint],
													fullWidth: !parsedFullWidth,
												}
											});
										}}
										className={buttonClass}
										icon={icons.columnGuttersLR}
									>
										{__('Fullwidth', 'eightshift-frontend-libs')}
									</Button>
								}

								{autoOffsetToggle && index === 0 &&
									<Button
										isPressed={offset === autoOffsetValue}
										onClick={() => {
											onChange({
												...value,
												[breakpoint]: {
													...value[breakpoint],
													offset: offset === autoOffsetValue ? 1 : autoOffsetValue,
												}
											});
										}}
										className={buttonClass}
										icon={icons.offsetAuto}
									>
										{__('Automatic offset', 'eightshift-frontend-libs')}
									</Button>
								}
							</>
						}
						additionalControlsBelow={index === 0 ? null :
							<div className='es-h-start es-mt-2 es-border es-border-color-cool-gray-100 es-rounded-1.5 es-px-1! es-py-0.5! es-display-flex es-gap-1! es-ml-2.5 es-w-full'>
								<IconLabel icon={icons.inherit} label={__('Inherit', 'eightshift-frontend-libs')} standalone additionalClasses='es-gap-0.25! es-mr-auto es-text-3! -es-ml-4 es-bg-pure-white es-py-1 es-nested-color-cool-gray-450!' />

								<Button
									isPressed={inheritCheck(offset)}
									onClick={() => {
										onChange({
											...value,
											[breakpoint]: {
												...value[breakpoint],
												offset: inheritCheck(offset) ? parsedOffset : inheritValue,
											}
										});
									}}
									className={buttonClass}
								>
									{__('Offset', 'eightshift-frontend-libs')}
								</Button>

								<Button
									isPressed={inheritCheck(width)}
									onClick={() => {

										onChange({
											...value,
											[breakpoint]: {
												...value[breakpoint],
												width: inheritCheck(width) ? displayedWidth : inheritValue,
											}
										});
									}}
									className={buttonClass}
								>
									{__('Width', 'eightshift-frontend-libs')}
								</Button>

								{fullWidthToggle &&
									<Button
										isPressed={inheritCheck(fullWidth)}
										onClick={() => {
											onChange({
												...value,
												[breakpoint]: {
													...value[breakpoint],
													fullWidth: inheritCheck(fullWidth) ? false : inheritValue,
												}
											});
										}}
										className={buttonClass}
									>
										{__('Fullwidth', 'eightshift-frontend-libs')}
									</Button>
								}
							</div>
						}
					/>
				);
			})}
		</Responsive>
	);
};
