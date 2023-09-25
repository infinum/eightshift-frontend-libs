import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { Placeholder, Button } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useSelect, dispatch } from '@wordpress/data';
import { BlockIcon, BlockInserter, getUnique, icons, outputCssVariables } from '@eightshift/frontend-libs/scripts';
import globalManifest from './../../../manifest.json';
import manifest from './../manifest.json';

export const ColumnsEditor = ({ attributes, clientId }) => {
	const unique = useMemo(() => getUnique(), []);

	const innerBlockCount = useSelect((select) => select('core/block-editor').getBlock(clientId).innerBlocks);

	const {
		title,
		layoutPresets,
	} = manifest;

	const {
		columnsAllowedBlocks,
		blockClass,
	} = attributes;

	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			{innerBlockCount?.length < 1 &&
				<Placeholder
					icon={<BlockIcon iconName='es-columns' />}
					label={<span className='es-font-weight-400'>{title}</span>}
					className='es-max-w-108 es-rounded-3! es-mx-auto! es-font-weight-400 es-color-cool-gray-500! es-nested-color-current!'
				>
					<div className='es-v-spaced es-w-full'>
						<h4 className='es-my-1! es-mx-0! es-text-5 es-font-weight-500 es-color-pure-black'>
							{__('Common layouts', 'eightshift-frontend-libs')}
						</h4>

						<div className='es-h-spaced-wrap es-gap-2!'>
							{layoutPresets.map(({ name, icon, blocks: blockData }, index) => {
								return (
									<Button
										key={index}
										// eslint-disable-next-line max-len
										className='es-v-spaced es-content-center! es-m-0! es-nested-w-8 es-nested-h-8 es-h-auto es-w-32 es-h-24 es-rounded-1.5 es-border es-border-cool-gray-100 es-hover-border-cool-gray-400 es-transition es-nested-m-0!'
										onClick={() => {
											const blocksToInsert = blockData.map(({ name: blockName, attributes: blockAttrs }) => {
												return createBlock(blockName, blockAttrs);
											});

											dispatch('core/block-editor').insertBlocks(blocksToInsert, 0, clientId);
										}}
										icon={icons?.[icon] ?? icons.genericShapesAlt}
									>
										{name}
									</Button>
								);
							})}
						</div>

						<div className='es-h-spaced es-my-2'>
							<div className='es-h-px es-w-full es-bg-cool-gray-100 es-rounded-full'></div>
							<span>{__('or', 'eightshift-frontend-libs')}</span>
							<div className='es-h-px es-w-full es-bg-cool-gray-100 es-rounded-full'></div>
						</div>

						<Button
							onClick={() => {
								const column = createBlock(`${globalManifest.namespace}/${manifest.innerBlocksDependency[0]}`, {
									columnOffsetLarge: 1,
								});

								dispatch('core/block-editor').insertBlock(column, 0, clientId);
							}}
							// eslint-disable-next-line max-len
							className={'es-slight-button-border-cool-gray-400 es-hover-slight-button-border-admin-accent es-active-slight-button-border-admin-accent es-focus-slight-button-border-admin-accent es-nested-m-0! es-gap-1.25! es-bg-pure-white! es-mx-auto es-text-3.25! es-color-cool-gray-650 es-rounded-1.5! es-flex-shrink-0'}
							icon={icons.wrench}
						>
							{__('Custom layout', 'eightshift-frontend-libs')}
						</Button>
					</div>
				</Placeholder>
			}

			<InnerBlocks
				allowedBlocks={(typeof columnsAllowedBlocks === 'undefined') || columnsAllowedBlocks}
				orientation='horizontal'
				renderAppender={innerBlockCount?.length > 0 ? () => <BlockInserter clientId={clientId} hasLabel /> : false}
			/>
		</div >
	);
};
