import { getPaletteColors } from "./get-palette-colors";

/**
 * Use this hook to filter the global colors out of the component or block manifest
 *
 * Requires WP => 5.3
 *
 * @param {array} colors Array of colors to filter.
 *
 * @return object
 *
 */
export const getOptionColors = (colors) => {
	const coreColors = getPaletteColors();

	if (!Array.isArray(colors) || !colors.length) {
		return Object.values(coreColors);
	}

	return colors.map((colorName) => coreColors[colorName]);
};
