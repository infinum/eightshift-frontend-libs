import React from 'react';
import { checkAttrResponsive, CompactResponsive, CustomRangeSlider, CustomRangeSliderStyle, getAttrKey, IconLabel, icons, getDefaultBreakpointNames } from '@eightshift/frontend-libs/scripts';
import { __, _n, sprintf } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

export const WidthOffsetRangeSlider = (props) => {
	const {
		breakpointNames = getDefaultBreakpointNames(),

		manifest,
		attributes,
		setAttributes,

		icon = icons.positioningWidthGuide,
		label = __('Width & offset', 'eightshift-frontend-libs'),

		isFullWidthAttributeName,
		offsetAttributeName,
		widthAttributeName,

		showFullWidthToggle = true,
		includeGutters = false, // Only valid if 'showfullWidthToggle' is false.
		showOffsetAutoToggle = false,

		totalNumberOfColumns = 12,
	} = props;

	const {
		responsiveAttributes: manifestResponsiveAttributes,
	} = manifest;

	let isFullWidthCurrent = includeGutters;
	const offsetCurrent = checkAttrResponsive(offsetAttributeName, attributes, manifest, true);
	const widthCurrent = checkAttrResponsive(widthAttributeName, attributes, manifest, true);

	if (showFullWidthToggle) {
		isFullWidthCurrent = checkAttrResponsive(isFullWidthAttributeName, attributes, manifest, true);
	}

	return (
		<CompactResponsive label={<IconLabel icon={icon} label={label} />}>
			{breakpointNames.map((breakpoint, index) => {
				const {
					[offsetAttributeName]: offsetNames,
					[widthAttributeName]: widthNames,
				} = manifestResponsiveAttributes;

				let isFullWidthNames = undefined;

				if (showFullWidthToggle) {
					isFullWidthNames = manifestResponsiveAttributes[isFullWidthAttributeName];
				}

				let isFullWidthAttr = undefined;
				const offsetAttr = offsetNames[breakpoint];
				const widthAttr = widthNames[breakpoint];

				if (showFullWidthToggle) {
					isFullWidthAttr = isFullWidthNames[breakpoint];
				}

				const isFullWidth = showFullWidthToggle ? isFullWidthCurrent[breakpoint] : includeGutters;
				let offset = offsetCurrent[breakpoint];
				const width = widthCurrent[breakpoint];

				// Cover alternative empty/inherited states.
				if (offset === '') {
					offset = undefined;
				}

				const autoOffsetFactor = index === 0 && showOffsetAutoToggle && typeof offset === 'undefined' ? 1 : undefined;

				let breakpointBeforeIsFullWidth;
				let breakpointBeforeOffset = breakpointNames[index - 1];
				let breakpointBeforeWidth = breakpointNames[index - 1];

				if (showFullWidthToggle) {
					breakpointBeforeIsFullWidth = breakpointNames[index - 1];
				}

				// If inheriting, find the nearest set value, from mobile up.
				let isFullWidthInherited = includeGutters;
				let offsetInherited = offsetCurrent[breakpointBeforeOffset];
				let widthInherited = widthCurrent[breakpointBeforeWidth];

				if (showFullWidthToggle) {
					for (let i = index; i >= 0; i--) {
						breakpointBeforeIsFullWidth = breakpointNames[i];
						isFullWidthInherited = isFullWidthCurrent[breakpointBeforeIsFullWidth];

						if (typeof isFullWidthInherited !== 'undefined') {
							break;
						}
					}
				}

				for (let i = index; i >= 0; i--) {
					breakpointBeforeOffset = breakpointNames[i];
					offsetInherited = offsetCurrent[breakpointBeforeOffset];

					if (typeof offsetInherited !== 'undefined') {
						break;
					}
				}


				for (let i = index; i >= 0; i--) {
					breakpointBeforeWidth = breakpointNames[i];
					widthInherited = widthCurrent[breakpointBeforeWidth];

					if (typeof widthInherited !== 'undefined') {
						break;
					}
				}

				// The width is 1 extra both for display purposes and how CSS grid works.
				const maxWidth = ((isFullWidth ?? isFullWidthInherited) || (showFullWidthToggle && includeGutters)) ? (totalNumberOfColumns + 3) : (totalNumberOfColumns + 1);

				return (
					<div className={index === 0 ? 'es-mb-0 es-pb-6' : 'es-has-wp-field-b-space'} key={index}>
						<div className='es-h-end es-mb-2'>
							{showFullWidthToggle && typeof isFullWidth !== 'undefined' &&
								<Button
									isSmall
									isPressed={isFullWidth}
									onClick={() => setAttributes({ [getAttrKey(isFullWidthAttr, attributes, manifest)]: !isFullWidth, })}
									className='es-slight-button-border es-button-icon-18 es-has-v2-gutenberg-button-active-state es-button-no-icon-spacing es-gap-1.25! es-rounded-1.0 es-h-7! es-px-2!'
									icon={icons.columnGuttersLR}
								>
									{__('Fullwidth', 'eightshift-frontend-libs')}
								</Button>
							}

							{showOffsetAutoToggle && index === 0 &&
								<Button
									isSmall
									isPressed={typeof offset === 'undefined'}
									onClick={() => setAttributes({ [getAttrKey(offsetAttr, attributes, manifest)]: typeof offset === 'undefined' ? 1 : undefined })}
									className='es-slight-button-border es-button-icon-18 es-has-v2-gutenberg-button-active-state es-button-no-icon-spacing es-gap-1.25! es-rounded-1.0 es-h-7! es-px-2!'
									icon={icons.offsetAuto}
								>
									{__('Automatic offset', 'eightshift-frontend-libs')}
								</Button>
							}
						</div>

						<CustomRangeSlider
							disabled={typeof width === 'undefined' && typeof offset === 'undefined'} // Disable the slider if offset & width are inherited.
							min={1}
							max={maxWidth}
							tooltipFormat={(v) => {
								if (v === offset) {
									if (v - 1 === 0) {
										return __('No offset', 'eightshift-frontend-libs');
									}

									return sprintf(_n('Offset: %d column', 'Offset: %d columns', v - 1, 'eightshift-frontend-libs'), v - 1);
								}

								return sprintf(_n('Width: %d column', 'Width: %d columns', v - 1, 'eightshift-frontend-libs'), v - 1);
							}}
							tooltipPlacement='left'
							value={[(offset ?? offsetInherited ?? autoOffsetFactor ?? 1), Math.min((width ?? widthInherited) + (offset ?? offsetInherited ?? autoOffsetFactor ?? 1), maxWidth)]} // Take the inherited value, if it doesn't exist take the actual value. Limit it all to max width.
							onChange={([start, endRaw]) => {
								// Limit the end value.
								const end = Math.min(endRaw, maxWidth);

								if (offset !== undefined && typeof width === 'undefined') {
									// If width is inherited just change the offset.
									setAttributes({ [getAttrKey(offsetAttr, attributes, manifest)]: Math.min(start, maxWidth - widthInherited) });
								}
								else if (width !== undefined && typeof offset === 'undefined') {
									// If offset is inherited just change the width.
									setAttributes({ [getAttrKey(widthAttr, attributes, manifest)]: Math.min(end - start, maxWidth) });
								}
								else {
									// If none are inherited, set both.
									setAttributes({
										[getAttrKey(offsetAttr, attributes, manifest)]: start,
										[getAttrKey(widthAttr, attributes, manifest)]: Math.min(end - start, maxWidth),
									});
								}
							}}
							pushable={1} // Ensures that two points can't be on top of each other...
							allowCross={false} //  ...or crossed.
							draggableTrack={width !== undefined && offset !== undefined} // Allow dragging the whole slider if nothing is inherited.
							sliderStyle={CustomRangeSliderStyle.COLUMN_PICKER}
							marks={{
								...[...Array(maxWidth - 1).keys()].reduce((original, i) => ({ ...original, [i + 1]: i + 1 }), {}),
								[maxWidth + 1]: '',
							}}
							className={[
								// Because we don't want to show line numbers, but column numbers we need to shift everything to the right a bit,
								// which means some of the lines on the slider will need to be hidden, some will need to have their active styling
								// disabled and shown as inactive.
								((showFullWidthToggle && includeGutters) || (isFullWidth ?? isFullWidthInherited)) ? 'rd-slider-mark-offset-fullwidth' : 'rd-slider-mark-offset',
								(width ?? widthInherited) !== maxWidth ? `rd-slider-mark-ignore-${(offset ?? offsetInherited ?? autoOffsetFactor) + (width ?? widthInherited)}` : '',
								`rd-slider-line-ignore-${(offset ?? offsetInherited ?? autoOffsetFactor) + (width ?? widthInherited)}`,
								`rd-slider-line-ignore-${offset ?? offsetInherited ?? autoOffsetFactor}`,
								typeof width === 'undefined' ? 'rd-no-width-handle' : '',
								typeof offset === 'undefined' ? 'rd-no-offset-handle' : '',
							].join(' ')}
						/>

						{index !== 0 &&
							<div className='es-h-start es-mt-8 es-border es-border-color-cool-gray-100 es-rounded-1.5 es-px-1.0! es-py-0.5! es-display-flex es-gap-1.0! es-ml-2.5'>
								<IconLabel icon={icons.inherit} label={__('Inherit', 'eightshift-frontend-libs')} standalone additionalClasses='es-gap-0.25! es-mr-auto es-text-3! -es-ml-4 es-bg-pure-white es-py-1.0 es-nested-color-cool-gray-450!' />

								<Button
									isSmall
									isPressed={typeof offset === 'undefined'}
									onClick={() => setAttributes({ [getAttrKey(offsetAttr, attributes, manifest)]: typeof offset === 'undefined' ? 1 : undefined })}
									className='es-slight-button-border es-has-v2-gutenberg-button-active-state es-button-no-icon-spacing es-gap-1.25! es-rounded-1.0 es-h-7! es-px-2!'
								>
									{__('Offset', 'eightshift-frontend-libs')}
								</Button>

								<Button
									isSmall
									isPressed={typeof width === 'undefined'}
									onClick={() => setAttributes({ [getAttrKey(widthAttr, attributes, manifest)]: typeof width === 'undefined' ? maxWidth : undefined, })}
									className='es-slight-button-border es-has-v2-gutenberg-button-active-state es-button-no-icon-spacing es-gap-1.25! es-rounded-1.0 es-h-7! es-px-2!'
								>
									{__('Width', 'eightshift-frontend-libs')}
								</Button>

								{showFullWidthToggle &&
									<Button
										isSmall
										isPressed={typeof isFullWidth === 'undefined'}
										onClick={() => setAttributes({ [getAttrKey(isFullWidthAttr, attributes, manifest)]: typeof isFullWidth === 'undefined' ? false : undefined })}
										className='es-slight-button-border es-has-v2-gutenberg-button-active-state es-button-no-icon-spacing es-gap-1.25! es-rounded-1.0 es-h-7! es-px-2!'
									>
										{__('Fullwidth', 'eightshift-frontend-libs')}
									</Button>
								}
							</div>
						}
					</div>
				);
			})}
		</CompactResponsive>
	);
};
