import { hexToRgb } from '../editor';

/**
 * Calculates the luminance of a given color, useful for calculating contrast ratios.
 *
 * @param {Number} r Red component of the color (0 - 255).
 * @param {Number} g Green component of the color (0 - 255).
 * @param {Number} b Blue component of the color (0 - 255).
 *
 * @returns Luminance of the color (0 - 1).
 */
export const luminanceFromRgb = (r, g, b) => {
	const a = [r, g, b].map((rawValue) => {
		const v = rawValue / 255;

		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	});

	return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 * Calculates the luminance of a given hex color, useful for calculating contrast ratios.
 *
 * @param {string} color Hex color to calculate the luminance from.
 *
 * @returns Luminance of the color (0 - 1).
 */
export const luminanceFromHex = (color) => {
	return luminanceFromRgb(...hexToRgb(color).split(' '));
};
