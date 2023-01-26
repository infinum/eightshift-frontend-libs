import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { outputCssVariables } from '@eightshift/frontend-libs/scripts/editor';
import manifest from '../manifest.json';
import globalManifest from '../../../manifest.json';
import { BlockInserter } from '@eightshift/frontend-libs/scripts';

export const ColumnEditor = ({ attributes, clientId }) => {
	return (
		<>
			{outputCssVariables(attributes, manifest, clientId, globalManifest)}

			<InnerBlocks renderAppender={() => <BlockInserter clientId={clientId} small />} />
		</>
	);
};
