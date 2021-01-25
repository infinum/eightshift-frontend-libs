/**
 * Unit tests for get-option-colors.js helper
 *
 * @group unit
 */

// Mock for getPaletteColors() return value.
const coreColors = {
	"primary": {
		"name": "Primary",
		"slug": "primary",
		"color": "#022687"
	},
	"black": {
		"name": "Black",
		"slug": "black",
		"color": "#000000"
	},
	"white": {
		"name": "White",
		"slug": "white",
		"color": "#FFFFFF"
	},
	"secondary": {
		"name": "Secondary",
		"slug": "secondary",
		"color": "#05A8AA"
	},
	"caribbean": {
		"name": "Caribbean",
		"slug": "caribbean",
		"color": "#06BDBF"
	},
	"transparent": {
		"name": "Transparent",
		"slug": "transparent",
		"color": "transparent"
	}
};

const mockGetPaletteColors = jest.fn().mockReturnValue(coreColors);

jest.mock('../../../../scripts/editor/get-palette-colors', () => ({
	__esModule: true,
	getPaletteColors: mockGetPaletteColors
}));

import { getOptionColors } from '../../../../scripts/editor/get-option-colors';

it('tests optionColors helper returns correct color subset', () => {
	const colors = getOptionColors(["primary", "white"]);

	expect(colors).toBe(
		[
			coreColors.primary,
			coreColors.white
		]
	);
});

it('tests optionColors helper fallbacks to core if no color is passed', () => {
	const colors = getOptionColors();

	expect(colors).toBe(Object.values(coreColors));
});
