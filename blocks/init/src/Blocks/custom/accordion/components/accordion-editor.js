import React from 'react';
import { BlockInserter } from '@eightshift/frontend-libs/scripts';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { clsx } from '@eightshift/ui-components/utilities';

export const AccordionEditor = ({ attributes, clientId }) => {
	const {
		accordionAllowedBlocks,
		blockClass,
	} = attributes;

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: (typeof accordionAllowedBlocks === 'undefined') || accordionAllowedBlocks,
		renderAppender: () => <BlockInserter clientId={clientId} className='es-mb-4' hasLabel />,
	});

	const modifiedInnerBlockProps = {
		...innerBlocksProps,
		className: clsx(innerBlocksProps.className, blockClass),
	};

	return (
		<div {...modifiedInnerBlockProps}/>
	);
};
