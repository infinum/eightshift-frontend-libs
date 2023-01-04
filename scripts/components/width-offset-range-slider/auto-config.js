import { checkAttrResponsive, getOption, getDefaultBreakpointNames, ucfirst } from '@eightshift/frontend-libs/scripts';

export const generateWidthOffsetRangeSliderConfig = (props) => {
	const {
		isFullWidthAttributeName,
		offsetAttributeName,
		widthAttributeName,
		showFullWidth,
		minMaxStepOptionName,
		manifest,
		attributes,
		setAttributes,
		breakpointNames = getDefaultBreakpointNames(),
	} = props;

	const widths = checkAttrResponsive(widthAttributeName, attributes, manifest, true);
	const offsets = checkAttrResponsive(offsetAttributeName, attributes, manifest, true);

	const minMaxStep = getOption(minMaxStepOptionName, attributes, manifest);

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
		totalNumberOfColumns: minMaxStep.max,
		fullWidthToggle: showFullWidth,
		...minMaxStep,
	};
};
