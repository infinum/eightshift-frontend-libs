import React from 'react';
import { assign } from 'lodash';
import classnames from 'classnames';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { select } from '@wordpress/data';
import { checkAttr, outputCssVariables, STORE_NAME } from '@eightshift/frontend-libs/scripts';
import manifest from './../wrapper/manifest.json';
import { Wrapper } from './wrapper';

const {
	componentClass,
} = manifest;

/**
 * Set wrapper component.
 */
const setWrapper = createHigherOrderComponent((BlockListBlock) => {
	const customBlockName = select(STORE_NAME).getSettingsGlobalVariablesCustomBlockName();
	const namespace = select(STORE_NAME).getSettingsNamespace();

	return (innerProps) => {
		const {
			clientId,
			name,
			className = '',
			rootClientId,
			block,
			attributes,
			attributes: {
				blockWrapClass
			},
		} = innerProps;

		let updatedProps = innerProps;

		const blockNamespace = name.split('/')[0];

		const wrapperClass = classnames([
			componentClass,
			customBlockName,
			blockWrapClass,
		]);

		const wrapperDisable = checkAttr('wrapperDisable', attributes, manifest);

		// Bailout if this none eightshift block.
		if (blockNamespace !== namespace) {

			// Disable wrapper on multiple nested blocks on the none eightshift blocks.
			if (typeof rootClientId !== 'undefined') {
				return (
					<BlockListBlock
						{...assign({}, updatedProps, {
							attributes: assign({}, attributes, {
								wrapperDisable: true,
							}),
							block: {
								attributes: assign({}, block.attributes, {
									wrapperDisable: true,
								}),
							},
						})}
					/>
				);
			}

			// Return none eightshift block with variables and correct layout by adding wrapper class and data id to parent auto created div.
			return (
				<>
					{!wrapperDisable && outputCssVariables(attributes, manifest, clientId, {}, componentClass)}
					<BlockListBlock {...updatedProps} />
				</>
			);
		}

		// Return eightshift block with variables and correct layout by adding wrapper class and data id to parent auto created div.
		return (
			<>
				{!wrapperDisable && outputCssVariables(attributes, manifest, clientId, {}, componentClass)}
				<BlockListBlock
					wrapperProps={{ 'data-id': clientId }}
					{...assign({}, innerProps, {
						className: classnames([
							className,
							wrapperClass,
						]),
					})}
				/>
			</>
		);
	};
}, 'setWrapper');

/**
 * Set wrapper component around the none Eightshift blocks.
 */
const setNoneEightshiftBlocksWrapper = createHigherOrderComponent((BlockEdit) => {
	const customBlockName = select(STORE_NAME).getSettingsGlobalVariablesCustomBlockName();
	const namespace = select(STORE_NAME).getSettingsNamespace();

	return (innerProps) => {
		const {
			name,
			clientId,
			attributes: {
				blockWrapClass
			},
		} = innerProps;

		const blockNamespace = name.split('/')[0];

		const wrapperClass = classnames([
			componentClass,
			customBlockName,
			blockWrapClass,
			blockNamespace !== namespace && 'none-eightshift-block',
		]);

		// Return block with wrapper around if it is none eightshift block.
		if (blockNamespace !== namespace) {
			return (
				<Wrapper props={innerProps}>
					<div className={wrapperClass} data-id={clientId}>
						<BlockEdit {...innerProps} />
					</div>
				</Wrapper>
			);
		}

		// Return normal flow if eightshift block.
		return <BlockEdit {...innerProps} />;
	};
}, 'setNoneEightshiftBlocksWrapper');

export const hooks = () => {
	const namespace = select(STORE_NAME).getSettingsNamespace();

	addFilter('editor.BlockListBlock', namespace, setWrapper);
	addFilter('editor.BlockEdit', namespace, setNoneEightshiftBlocksWrapper);
};
