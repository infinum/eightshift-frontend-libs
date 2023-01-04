import { checkAttrResponsive, getDefaultBreakpointNames, ucfirst } from '@eightshift/frontend-libs/scripts';

/**
 *
 * @param {Object} options                            - Generation configuration.
 * @param {string} [options.isFullWidthAttributeName] - Full-width property attribute name.
 * @param {string} options.offsetAttributeName        - Offset property attribute name.
 * @param {string} options.widthAttributeName         - Width property attribute name.
 * @param {Boolean} [options.showFullWidth=false]     - If `true`, the full-width toggle is shown.
 * @param {Number} [options.min=1]                    - Minimum value of the slider.
 * @param {Number} [options.numOfColumns=12]          - Number of columns available to choose from.
 * @param {Object} options.manifest                   - Component/block manifest.
 * @param {Object} options.attributes                 - Component/block attributes object.
 * @param {function} options.setAttributes            - Component/block setAttributes function.
 * @param {string[]?} [options.breakpointNames]       - Breakpoint names to show.
 * @returns Configuration object.
 */
export const generateWidthOffsetRangeSliderConfig = (options) => {
	const {
		isFullWidthAttributeName,
		offsetAttributeName,
		widthAttributeName,
		showFullWidth = false,
		min = 1,
		numOfColumns = 12,
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
					additional = { [`${isFullWidthAttributeName}${ucfirst(breakpoint)}`]: attrs.fullWidth, };
				}

				return {
					...all,
					[`${widthAttributeName}${ucfirst(breakpoint)}`]: attrs.width,
					[`${offsetAttributeName}${ucfirst(breakpoint)}`]: attrs.offset,
					...additional,
				};
			}, {});

			setAttributes(newData);
		},
		min: min,
		totalNumberOfColumns: numOfColumns,
		fullWidthToggle: showFullWidth,
	};
};
