import React from 'react';
import { assign } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose';
import { getCommonAttributes } from './registration';
import { select } from '@wordpress/data';
import { STORE_NAME } from './store';

const namespace = select(STORE_NAME).getSettingsNamespace();

/**
 * Update attributes with the correct blockClientId with the block clientID.
 *
 * @access private
 */
export const setCorrectBlockData = createHigherOrderComponent((BlockListBlock) => {
	return (innerProps) => {
		const {
			clientId,
			name,
			attributes,
			block,
		} = innerProps;

		let updatedProps = innerProps;

		if (name.split('/')[0] === namespace) {
			// Update only our blocks.
			updatedProps = assign({}, innerProps, {
				// Assign clientId to our internal attribute used for inline css variables.
				attributes: assign({}, attributes, {
					blockClientId: clientId,
				}),
				block: {
					attributes: assign({}, block.attributes, {
						blockClientId: clientId,
					}),
				},
			});
		}

		return (
			<BlockListBlock {...updatedProps} />
		);
	};
}, 'setCorrectBlockData');

/**
 * Set correct block attributes for not our eightshift blocks.
 *
 * @param {object} settings Block settings to filter.
 * @param {string} name Block name to filter.
 * 
 * @access private
 * 
 * @returns {object} Correct blocks attributes.
 *
 */
export const setCorrectBlockAttributes = (settings, name) => {
	const blockNameSplit = name.split('/');
	const blockNamespace = blockNameSplit[0];
	const blockName = blockNameSplit[1];

	const wrapperAttributes = select(STORE_NAME).getWrapperAttributes();

	if (blockNamespace !== namespace) {
		const {
			attributes,
		} = settings;
		return assign({}, settings, {
			attributes: assign({}, attributes, wrapperAttributes, getCommonAttributes(blockNamespace, blockName, false)),
		});
	}

	return settings;
};
