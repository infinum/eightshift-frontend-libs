import { checkAttrResponsive, getDefaultBreakpointNames } from '@eightshift/frontend-libs/scripts';
import { upperFirst } from '@eightshift/ui-components/utilities';

/**
 *
 * @param {Object} options                               - Generation configuration.
 * @param {string} [options.isFullWidthAttributeName]    - Full-width property attribute name.
 * @param {string} options.offsetAttributeName           - Offset property attribute name.
 * @param {string} options.widthAttributeName            - Width property attribute name.
 * @param {Boolean} [options.showFullWidth=false]        - If `true`, the full-width toggle is shown.
 * @param {Boolean} [options.showOffsetAutoToggle=false] - If `true`, the automatic offset toggle is shown.
 * @param {Boolean} [options.numericValues=false]        - If `true`, the values returned are `Number`s, instead of `string`s. Not compatible with Auto offset toggle.
 * @param {Number} [options.min=1]                       - Minimum value of the slider.
 * @param {Number} [options.numOfColumns=12]             - Number of columns available to choose from.
 * @param {Object} options.manifest                      - Component/block manifest.
 * @param {Object} options.attributes                    - Component/block attributes object.
 * @param {function} options.setAttributes               - Component/block setAttributes function.
 * @param {string[]?} [options.breakpointNames]          - Breakpoint names to show.
 * @returns Configuration object.
 */
export const generateWidthOffsetRangeSliderConfig = (options) => {
	const {
		isFullWidthAttributeName,
		offsetAttributeName,
		widthAttributeName,
		showFullWidth = false,
		showOffsetAutoToggle=false,
		min = 1,
		numOfColumns = 12,
		numericValues = false,
		manifest,
		attributes,
		setAttributes,
		breakpointNames = getDefaultBreakpointNames(),
	} = options;

	const widths = checkAttrResponsive(widthAttributeName, attributes, manifest, true);
	const offsets = checkAttrResponsive(offsetAttributeName, attributes, manifest, true);

	const value = breakpointNames.reduce((all, current) => {
		let additional = {};

		if (showFullWidth) {
			const fullWidths = checkAttrResponsive(isFullWidthAttributeName, attributes, manifest, true);
			additional = { fullWidth: fullWidths[current] };
		}

		return {
			...all,
			[current]: {
				width: widths[current],
				offset: offsets[current],
				...additional,
			}
		};
	}, {});

	return {
		value: value,
		onChange: (value) => {
			const newData = Object.entries(value).reduce((all, [breakpoint, attrs]) => {
				let additional = {};

				if (showFullWidth) {
					additional = { [`${isFullWidthAttributeName}${upperFirst(breakpoint)}`]: attrs.fullWidth, };
				}

				return {
					...all,
					[`${widthAttributeName}${upperFirst(breakpoint)}`]: attrs.width,
					[`${offsetAttributeName}${upperFirst(breakpoint)}`]: attrs.offset,
					...additional,
				};
			}, {});

			setAttributes(newData);
		},
		min: min,
		totalNumberOfColumns: numOfColumns,
		fullWidthToggle: showFullWidth,
		autoOffsetToggle: showOffsetAutoToggle,
		numericValues: numericValues,
	};
};
