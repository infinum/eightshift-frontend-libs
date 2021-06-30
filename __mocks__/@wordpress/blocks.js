/**
 * Mock of the @wordpress/blocks package. You can add mocks for new stores to the `mockSelectors` method.
 */

/**
 * Mock of the import { registerBlockType } from '@wordpress/blocks';
 */
export const registerBlockType = (blockName, options = {}) => {
	return {
		blockName,
		options
	};
}

/**
 * Mock of the import { registerBlockVariation } from '@wordpress/blocks';
 */
export const registerBlockVariation = (blockName, options = {}) => {
	return {
		blockName,
		options
	};
}
