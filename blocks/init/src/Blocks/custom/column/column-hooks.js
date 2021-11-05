import { assign } from 'lodash';
import classnames from 'classnames';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from "@wordpress/hooks";
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

		let updatedProps = innerProps;

		if (name === fullBlockName) {
			const componentClass = classnames([
				blockClass,
				customBlocksName,
			]);
			updatedProps = assign(
				{},
				innerProps,
				{
					className: componentClass,
				},
			);
		}

		const dataProps = { 'data-id': clientId };

		return (
			// columnProps are for WP <= 5.7, wrapperProps are for WP >= 5.8
			<BlockListBlock {...updatedProps} columnProps={dataProps} wrapperProps={dataProps} />
		);
	};
}, 'parentComponentBlock');

export const hooks = () => {
	addFilter('editor.BlockListBlock', fullBlockName, parentComponentBlock);
};
