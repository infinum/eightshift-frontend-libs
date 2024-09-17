import React from 'react';
import { Responsive } from '@eightshift/frontend-libs/scripts';
import { icons } from '@eightshift/ui-components/icons';
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	HStack,
	ToggleButton,
	ColumnConfigSlider,
} from '@eightshift/ui-components';
import { clsx } from '@eightshift/ui-components/utilities';

/**
 * A modern and customizable custom slider.
 *
 * @typedef {null | 'dots' | true | {Number: string} | {Number: {style, label}}} DotStyle
 * @typedef {'top'|'bottom'|'hidden'} TooltipPosition
 *
 * @param {object} props - WidthOffsetRangeSlider options.
 * @param {React.Component?} [props.icon] - Icon to show next to the label
 * @param {React.Component?} [props.label] - Label to show above component.
 * @param {Object} [props.value] - Value to use - keys are breakpoint names, values are `width`, `offset`, `fullWidth`.
 * @param {function} [props.onChange] - Function to trigger when the value of is changing.
 * @param {any} [props.inheritValue] - Value that marks something as inherited.
 * @param {function} [props.inheritCheck] - Function that returns a `boolean`, used to decide whether a value is inherited or not.
 * @param {boolean} [props.fullWidthToggle=false] - If `true`, the "Fullwidth" toggle is shown.
 * @param {boolean} [props.autoOffsetToggle=false] - If `true`, the "Automatic offset" toggle is shown.
 * @param {any} [props.autoOffsetValue] - Value that marks automatic offset.
 * @param {string?} [props.additionalClasses] - If passed, the classes are appended to the base control.
 * @param {boolean?} [props.numericValues=false] - If `true`, numeric values are returned instead of strings. Not compatible with `autoOffsetToggle`.
 * @param {Number} [props.totalNumberOfColumns=12] - Available number of columns to show.
 * @param {function} [props.onAfterChange] - Function to trigger when the value of the slider is changed.
 * @param {int|string} [props.colAutoStartOverride] - If passed, overrides the auto-calculated value of the automatic column start offset.
 * @param {boolean} [props.showOuterAsGutter] - If `true`, the outer columns are displayed with a special icons instead of the column numbers. Other numbers are offset by 1.
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

		additionalClasses,

		numericValues = false,

		totalNumberOfColumns: rawTotalColumns = 12,

		onAfterChange,

		colAutoStartOverride,

		showOuterAsGutter,
	} = props;

	const stringValues = !numericValues || autoOffsetToggle;

	const breakpointNames = Object.keys(value);

	const rawWidths = Object.entries(value).reduce(
		(all, [breakpointName, { width }]) => ({
			...all,
			[breakpointName]: width,
		}),
		{}
	);

	const rawOffsets = Object.entries(value).reduce(
		(all, [breakpointName, { offset }]) => ({
			...all,
			[breakpointName]: offset,
		}),
		{}
	);

	const rawFullWidths =
		fullWidthToggle &&
		Object.entries(value).reduce(
			(all, [breakpointName, { fullWidth }]) => ({
				...all,
				[breakpointName]: fullWidth,
			}),
			{}
		);

	return (
		<Responsive label={label} icon={icon} additionalClasses={additionalClasses}>
			{breakpointNames.map((breakpoint, index) => {
				const width = rawWidths[breakpoint];
				const offset = rawOffsets[breakpoint];
				const fullWidth = rawFullWidths?.[breakpoint];

				const isWidthInherited = inheritCheck(width);
				const isOffsetInherited = inheritCheck(offset);

				const autoStartOffset = colAutoStartOverride ?? 1;

				const getNearest = (attributeName) => {
					for (let i = index - 1; i >= 0; i--) {
						const breakpointName = breakpointNames[i];

						const current = value[breakpointName][attributeName];

						if (autoOffsetToggle && current === autoOffsetValue) {
							return autoStartOffset;
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

				const offsetValue = inheritCheck(offset) ? nearestValidOffset : offset;
				const parsedOffset =
					autoOffsetToggle && offsetValue === autoOffsetValue
						? autoStartOffset
						: parseInt(offsetValue);

				const parsedWidth = parseInt(
					inheritCheck(width) ? nearestValidWidth : width
				);
				const parsedFullWidth = inheritCheck(fullWidth)
					? nearestValidFullWidth
					: fullWidth;

				const displayedWidth = parsedWidth + parsedOffset - 1;

				const totalNumberOfColumns =
					rawTotalColumns + (parsedFullWidth === true ? 2 : 0);

				return (
					<>
						<HStack
							hidden={
								!(
									(fullWidthToggle &&
										(index === 0 || !inheritCheck(fullWidth))) ||
									(autoOffsetToggle && index === 0)
								)
							}
							className='es-uic-mb-1'
						>
							<ToggleButton
								hidden={
									!(
										fullWidthToggle &&
										(index === 0 || !inheritCheck(fullWidth))
									)
								}
								selected={parsedFullWidth}
								onChange={(value) => {
									onChange({
										...value,
										[breakpoint]: {
											...value[breakpoint],
											fullWidth: value,
										},
									});
								}}
								size='small'
								className='es-uic-ml-auto'
							>
								{__('Full-width', 'eightshift-frontend-libs')}
							</ToggleButton>

							<ToggleButton
								hidden={!(autoOffsetToggle && index === 0)}
								selected={offset === autoOffsetValue}
								onChange={() => {
									onChange({
										...value,
										[breakpoint]: {
											...value[breakpoint],
											offset: offset === autoOffsetValue ? 1 : autoOffsetValue,
										},
									});
								}}
								size='small'
								className={clsx(
									!(
										fullWidthToggle &&
										(index === 0 || !inheritCheck(fullWidth))
									) && 'es-uic-ml-auto'
								)}
							>
								{__('Automatic offset', 'eightshift-frontend-libs')}
							</ToggleButton>
						</HStack>

						<ColumnConfigSlider
							key={breakpoint}
							aria-label={__('Width & offset', 'eightshift-frontend-libs')}
							columns={totalNumberOfColumns}
							value={[parsedOffset, displayedWidth]}
							showOuterAsGutter={showOuterAsGutter ?? parsedFullWidth}
							onChange={([o, w]) => {
								let newValues = {};

								if (isWidthInherited && !isOffsetInherited) {
									newValues.offset = stringValues ? String(o) : o;
								} else if (!isWidthInherited && isOffsetInherited) {
									newValues.width = stringValues
										? String(w - nearestValidOffset + 1)
										: w - nearestValidOffset + 1;
								} else if (!isWidthInherited && offset === autoOffsetValue) {
									const newWidth = w - autoStartOffset;

									if (newWidth > 0) {
										newValues.width = stringValues
											? String(newWidth)
											: newWidth;
									}
								} else if (!isWidthInherited && !isOffsetInherited) {
									newValues.width = stringValues
										? String(w - o + 1)
										: w - o + 1;
									newValues.offset = stringValues ? String(o) : o;
								}

								onChange({
									...value,
									[breakpoint]: {
										...value[breakpoint],
										...newValues,
									},
								});
							}}
							disableWidth={inheritCheck(width)}
							disableOffset={
								inheritCheck(offset) ||
								(index === 0 && offset === autoOffsetValue)
							}
							onChangeEnd={onAfterChange}
						/>

						<BaseControl
							hidden={index === 0}
							icon={icons.inherit}
							label={__('Inherit', 'eightshift-frontend-libs')}
							className='es-uic-mt-2 es-uic-mb-2 es-uic-ml-auto es-uic-w-fit'
							inline
						>
							<HStack className='es-uic-ml-1'>
								<ToggleButton
									selected={inheritCheck(offset)}
									onChange={() => {
										onChange({
											...value,
											[breakpoint]: {
												...value[breakpoint],
												offset: inheritCheck(offset)
													? parsedOffset
													: inheritValue,
											},
										});
									}}
									size='small'
								>
									{__('Offset', 'eightshift-frontend-libs')}
								</ToggleButton>

								<ToggleButton
									selected={inheritCheck(width)}
									onChange={() => {
										onChange({
											...value,
											[breakpoint]: {
												...value[breakpoint],
												width: inheritCheck(width)
													? displayedWidth
													: inheritValue,
											},
										});
									}}
									size='small'
								>
									{__('Width', 'eightshift-frontend-libs')}
								</ToggleButton>

								<ToggleButton
									hidden={!fullWidthToggle}
									selected={inheritCheck(fullWidth)}
									onChange={() => {
										onChange({
											...value,
											[breakpoint]: {
												...value[breakpoint],
												fullWidth: inheritCheck(fullWidth)
													? false
													: inheritValue,
											},
										});
									}}
									size='small'
								>
									{__('Fullwidth', 'eightshift-frontend-libs')}
								</ToggleButton>
							</HStack>
						</BaseControl>
					</>
				);
			})}
		</Responsive>
	);
};
