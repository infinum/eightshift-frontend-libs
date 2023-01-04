import { checkAttrResponsive, getDefaultBreakpointNames, ucfirst } from '@eightshift/frontend-libs/scripts';

/**
 *
 * @param {Object} props Generation settings.
 * @returns Configuration object.
 */
export const generateWidthOffsetRangeSliderConfig = (props) => {
	const {
		isFullWidthAttributeName,
		offsetAttributeName,
		widthAttributeName,
		showFullWidth,
		min = 1,
		numOfColumns = 12,
		manifest,
		attributes,
		setAttributes,
		breakpointNames = getDefaultBreakpointNames(),
	} = props;

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
