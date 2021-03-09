/**
 * Mock of the @wordpress/data package. You can add mocks for new stores to the `mockSelectors` method.
 */

/**
 * Mock of the `select('core/block-editor)`;
 */
const storeCoreBlockEditor = () => ({
  getSettings: () => ({
    colors: [
      { "name": "Primary", "slug": "primary", "color": "#022687" },
      { "name": "Black", "slug": "black", "color": "#000000" },
      { "name": "White", "slug": "white", "color": "#FFFFFF" },
      { "name": "Secondary", "slug": "secondary", "color": "#05A8AA" },
      { "name": "Caribbean", "slug": "caribbean", "color": "#06BDBF" },
      { "name": "Transparent", "slug": "transparent", "color": "transparent" }
    ],
  }),
});

/**
 * Mock different stores, each should be defined in it's own function for readability's sake.
 */
const mockSelectors = {
  'core/block-editor': storeCoreBlockEditor(),
};

/**
 * Mock of the select function.
 *
 * @param {string} storeName Name of the store. For example "core/block-editor"
 */
export const select = ((storeName) => mockSelectors[storeName]);

/**
 * Mock of the useSelect((select) => {}) function.
 */
export const useSelect = jest.fn(fn => fn(select));
