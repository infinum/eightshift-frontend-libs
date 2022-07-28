import React from 'react';
import { assign } from 'lodash';
import classnames from 'classnames';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { select } from '@wordpress/data';
import { checkAttr, outputCssVariables, STORE_NAME } from '@eightshift/frontend-libs/scripts';
import manifest from './../wrapper/manifest.json';

/**
 * Update wrapper component.
 */
const setWrapper = createHigherOrderComponent((BlockListBlock) => {
	const customBlockName = select(STORE_NAME).getSettingsGlobalVariablesCustomBlockName();

	const {
		componentClass,
	} = manifest;

	return (innerProps) => {
		const {
			clientId,
			attributes,
			className = '',
		} = innerProps;
		
		const wrapperDisable = checkAttr('wrapperDisable', attributes, manifest);

		let updatedProps = innerProps;

		updatedProps = assign({}, innerProps, {
			className: classnames([
				className,
				componentClass,
				customBlockName,
				attributes.blockWrapClass,
			]),
		});

		return (
			<>
				{!wrapperDisable && outputCssVariables(attributes, manifest, clientId, {}, componentClass)}
				<BlockListBlock {...updatedProps} wrapperProps={{ 'data-id': clientId }} />
			</>
		);
	};
}, 'setWrapper');

export const hooks = () => {
	addFilter('editor.BlockListBlock', select(STORE_NAME).getSettingsNamespace(), setWrapper);
};
