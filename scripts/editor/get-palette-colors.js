/**
 * Use this hook to read editor-color-palette colors directly from WP built in store.
 *
 * Requires WP => 5.3
 */
export const getPaletteColors = () => {
	const settings = wp?.data?.select?.('core/block-editor')?.getSettings();

	if (!settings) {
		return {};
	}

	return settings.colors.reduce(
		(obj, item) => ({
			...obj,
			[item.slug]: item,
		}),
		{}
	);
}
