import React, { useMemo } from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { BlockInserter, getUnique, outputCssVariables } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ColumnsEditor = ({ attributes, clientId }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		columnsAllowedBlocks,
		blockClass,
	} = attributes;

	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<InnerBlocks
				allowedBlocks={(typeof columnsAllowedBlocks === 'undefined') || columnsAllowedBlocks}
				orientation='horizontal'
				renderAppender={() => <BlockInserter clientId={clientId} hasLabel />}
			/>
		</div>
	);
};
