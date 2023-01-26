import React from 'react';
import classnames from 'classnames';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import globalManifest from '../../manifest.json';
import manifest from './manifest.json';

const {
	namespace,
	globalVariables: {
		customBlocksName,
	},
} = globalManifest;

const { blockName } = manifest;
const fullBlockName = `${namespace}/${blockName}`;

// Add options to the Gutenberg markup.
const parentComponentBlock = createHigherOrderComponent((BlockListBlock) => {
	return (innerProps) => {
		const {
			name,
			clientId,
			attributes: {
				blockClass,
			},
		} = innerProps;

		let updatedProps = {...innerProps};

		if (name === fullBlockName) {
			const componentClass = classnames([
				blockClass,
				customBlocksName,
			]);

			updatedProps = {
				...innerProps,
				className: componentClass,
			};
		}

		const dataProps = { 'data-id': clientId };

		return (
			<BlockListBlock {...updatedProps} wrapperProps={dataProps} />
		);
	};
}, 'parentComponentBlock');

export const hooks = () => {
	addFilter('editor.BlockListBlock', fullBlockName, parentComponentBlock);
};
