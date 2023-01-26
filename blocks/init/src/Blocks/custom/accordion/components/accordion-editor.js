import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { BlockInserter } from '@eightshift/frontend-libs/scripts';

export const AccordionEditor = ({ attributes, clientId }) => {
	const {
		accordionAllowedBlocks,
		blockClass,
	} = attributes;

	return (
		<div className={blockClass}>
			<InnerBlocks
				allowedBlocks={(typeof accordionAllowedBlocks === 'undefined') || accordionAllowedBlocks}
				renderAppender={() => <BlockInserter clientId={clientId} className='es-mb-4' hasLabel />}
			/>
		</div>
	);
};
