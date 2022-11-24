import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';

export const AccordionEditor = ({ attributes }) => {
	const {
		accordionAllowedBlocks,
		blockClass,
	} = attributes;

	return (
		<div className={blockClass}>
			<InnerBlocks
				allowedBlocks={(typeof accordionAllowedBlocks === 'undefined') || accordionAllowedBlocks}
			/>
		</div>
	);
};
