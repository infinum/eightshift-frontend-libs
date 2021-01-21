import {getPaletteColors} from "./get-palette-colors";

/**
 * Use this hook to filter the global colors out of the component or block manifest
 *
 * Requires WP => 5.3
 */
export const getOptionColors = (colors) => {
	const coreColors = getPaletteColors();

	if (!Array.isArray(colors) || !colors.length) {
		return Object.values(coreColors);
	}

	return colors.map((colorName) => coreColors[colorName]);
};
