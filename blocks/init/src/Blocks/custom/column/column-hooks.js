/* eslint-disable no-unused-vars */

import React from 'react';
import { assign } from 'lodash';
import classnames from 'classnames';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { responsiveSelectors } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './manifest.json';
import globalManifest from '../../manifest.json';

// Add options to the Gutenberg markup.
const parentComponentBlock = createHigherOrderComponent((BlockListBlock) => {
	return (innerProps) => {
		const {
			name,
			attributes: {
				blockClass,

				widthLarge,
				widthDesktop,
				widthTablet,
				widthMobile,

				offsetLarge,
				offsetDesktop,
				offsetTablet,
				offsetMobile,

				orderLarge,
				orderDesktop,
				orderTablet,
				orderMobile,
			},
		} = innerProps;

		let updatedProps = innerProps;

		// Move selectors to the parent div in DOM.
		if (name === `${globalManifest.namespace}/${manifest.blockName}`) {
			const width = {
				large: widthLarge,
				desktop: widthDesktop,
				tablet: widthTablet,
				mobile: widthMobile,
			};
		
			const offset = {
				large: offsetLarge,
				desktop: offsetDesktop,
				tablet: offsetTablet,
				mobile: offsetMobile,
			};

			const order = {
				large: orderLarge,
				desktop: orderDesktop,
				tablet: orderTablet,
				mobile: orderMobile,
			};

			const componentClass = classnames(
				blockClass,
				globalManifest.globalVariables.customBlocksName,
				`${responsiveSelectors(width, 'width', blockClass)}`,
				`${responsiveSelectors(offset, 'offset', blockClass)}`,
				`${responsiveSelectors(order, 'order', blockClass)}`,
			);

			updatedProps = assign(
				{},
				innerProps,
				{
					className: componentClass,
				}
			);
		}

		return wp.element.createElement(
			BlockListBlock,
			updatedProps
		);
	};
}, 'parentComponentBlock');

export const hooks = () => {
	addFilter('editor.BlockListBlock', globalManifest.namespace, parentComponentBlock);
};
