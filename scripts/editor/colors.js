import { useSelect } from '@wordpress/data';
import { STORE_NAME } from './store';

/**
 * Returns colors from the global stores from the theme.
 *
 * @access public
 *
 * @returns {object}
 *
 * Usage:
 * ```js
 * getPaletteColors()
 * ```
 */
export const getPaletteColors = () =>
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useSelect((select) => {
		const colors = select(STORE_NAME).getSettings().globalVariables.colors;

		return colors.reduce(
			(obj, item) => ({
				...obj,
				[item.slug]: item,
			}),
			{},
		);
	});
