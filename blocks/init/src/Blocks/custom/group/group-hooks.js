/* eslint-disable no-unused-vars */

import React from 'react';
import { createHigherOrderComponent } from '@wordpress/compose';
import { overrideInnerBlockSimpleWrapperAttributes } from '@eightshift/frontend-libs/scripts/editor';
import { assign } from 'lodash';
import { useSelect } from '@wordpress/data';
import manifest from './manifest.json';
import globalManifest from '../../manifest.json';

const blockName = `${globalManifest.namespace}/${manifest.blockName}`;

// Add options to the Gutenberg markup.
const parentComponentBlock = createHigherOrderComponent((BlockListBlock) => {
	return (innerProps) => {
		return overrideInnerBlockSimpleWrapperAttributes(BlockListBlock, innerProps, blockName);
	};
}, 'parentComponentBlock');

 const test = (attributes, blockType) => {

	 console.log(blockType, 'ivan');
	// if (props.name === blockName) {
	// }

	// return props;
	// return (innerProps) => {
	// 	console.log(innerProps);
	// 	return innerProps;
	// };

	assign(blockType.attributes, {
		wrapperUse: {
			...blockType.attributes.wrapperUse,
			default: false,
		},
	});
 
	return blockType;
};

export const hooks = () => {
	// wp.hooks.addFilter('editor.BlockListBlock', blockName, parentComponentBlock);
	// useSelect((select) => {
	// 	wp.hooks.addFilter('blocks.getBlockAttributes', manifest.blockName, test);
	// });
};

