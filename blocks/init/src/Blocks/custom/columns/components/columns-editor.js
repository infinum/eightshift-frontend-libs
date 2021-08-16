import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { getUnique, outputCssVariables } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ColumnsEditor = ({ attributes }) => {
	const {
		columnsAllowedBlocks,
		blockClass,
	} = attributes;
	
	const unique = getUnique();

	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<InnerBlocks
				allowedBlocks={(typeof columnsAllowedBlocks === 'undefined') || columnsAllowedBlocks}
			/>
		</div>
	);
};
