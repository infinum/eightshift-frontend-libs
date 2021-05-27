import { assign } from 'lodash';
import { createElement } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import classnames from 'classnames';
import { createHigherOrderComponent } from '@wordpress/compose';
import { responsiveSelectors, checkAttrResponsive } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './manifest.json';
import globalManifest from '../../manifest.json';

const blockName = `${globalManifest.namespace}/${manifest.blockName}`;

// Add options to the Gutenberg markup.
const parentComponentBlock = createHigherOrderComponent((BlockListBlock) => {
	return (innerProps) => {
		const {
			name,
			attributes,
			attributes: {
				blockClass,
			},
		} = innerProps;

		let updatedProps = innerProps;

		// Move selectors to the parent div in DOM.
		if (name === blockName) {
			const columnWidth = checkAttrResponsive('columnWidth', attributes, manifest);
			const columnOffset = checkAttrResponsive('columnOffset', attributes, manifest);
			const columnHide = checkAttrResponsive('columnHide', attributes, manifest);
			const columnOrder = checkAttrResponsive('columnOrder', attributes, manifest);
			const columnAlign = checkAttrResponsive('columnAlign', attributes, manifest);


			const componentClass = classnames([
				blockClass,
				globalManifest.globalVariables.customBlocksName,
				responsiveSelectors(columnWidth, 'width', blockClass),
				responsiveSelectors(columnOffset, 'offset', blockClass),
				responsiveSelectors(columnOrder, 'order', blockClass),
				responsiveSelectors(columnAlign, 'align', blockClass),
				responsiveSelectors(columnHide, 'hide-editor', blockClass, false),
			]);

			updatedProps = assign(
				{},
				innerProps,
				{
					className: componentClass,
				}
			);
		}

		return createElement(
			BlockListBlock,
			updatedProps
		);
	};
}, 'parentComponentBlock');

export const hooks = () => {
	addFilter('editor.BlockListBlock', blockName, parentComponentBlock);
};
