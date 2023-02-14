import { checkAttrResponsive, getDefaultBreakpointNames, ucfirst, getOption } from '@eightshift/frontend-libs/scripts';

/**
 * A generator for `ResponsiveSlider` config from legacy `SpacingSlider` attributes.
 *
 * @param {Object} options                                      - Generation configuration.
 * @param {string} [options.attributeName]                      - Property attribute name.
 * @param {Object} options.attributes                           - Component/block attributes object.
 * @param {function} options.setAttributes                      - Component/block setAttributes function.
 * @param {Object} options.manifest                             - Component/block manifest.
 * @param {string} [options.minMaxStepOptionName=attributeName] - Name of the property from which to pull `min`, `max` and `step` values.
 * @param {string[]?} [options.breakpointNames]                 - Breakpoint names to show.
 *
 * @returns Configuration object.
 */
export const generateResponsiveSliderConfig = (options) => {
	const {
		attributeName,
		attributes,
		setAttributes,
		manifest,
		minMaxStepOptionName = attributeName,
		breakpointNames = getDefaultBreakpointNames(),
	} = options;

	const values = checkAttrResponsive(attributeName, attributes, manifest, true);

	const value = breakpointNames.reduce((all, current) => {
		return {
			...all,
			[current]: values[current]
		};
	}, {});

	const { min, max, step } =  getOption(minMaxStepOptionName, attributes, manifest);

	return {
		value: value,
		onChange: (value) => {
			const newData = Object.entries(value).reduce((all, [breakpoint, currentValue]) => {
				return {
					...all,
					[`${attributeName}${ucfirst(breakpoint)}`]: currentValue,
				};
			}, {});

			setAttributes(newData);
		},
		min: min,
		max: max,
		step: step,
	};
};
