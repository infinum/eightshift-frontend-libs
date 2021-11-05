/**
 * Mock of the @wordpress/element package. You can add mocks for new stores to the `mockSelectors` method.
 */

/**
 * Mock of the import { createElement } from '@wordpress/element';
 */
export const createElement = () => {
	return 'createElement';
};

export const Fragment = (props) => {
	return (
		<div>{props.children}</div>
	);
};
