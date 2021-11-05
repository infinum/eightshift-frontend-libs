/**
 * Mock of the @wordpress/block-editor package. You can add mocks for new stores to the `mockSelectors` method.
 */

/**
 * Mock of the import { InnerBlocks } from '@wordpress/block-editor';
 */
export const InnerBlocks = () => {
	return (
		<div>InnerBlocks</div>
	);
};

export const InspectorControls = (props) => {
	return (
		<div>{props.children}</div>
	);
};