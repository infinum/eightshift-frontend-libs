import { useSelect } from '@wordpress/data';

/**
 * Use this hook to read editor-color-palette colors directly from WP built in store.
 *
 * Requires WP => 5.3
 */
export const getPalleteColors = () => useSelect((select) => {
  const settings = select('core/block-editor').getSettings();
  return settings.colors.reduce(
    (obj, item) => ({
      ...obj,
      [item.slug]: item,
    }),
    {}
  );
});
