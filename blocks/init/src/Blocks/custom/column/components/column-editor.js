import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { outputCssVariables } from '@eightshift/frontend-libs/scripts/editor';
import manifest from '../manifest.json';
import globalManifest from '../../../manifest.json';

export const ColumnEditor = ({ attributes, clientId }) => {
	return (
		<>
			{outputCssVariables(attributes, manifest, clientId, globalManifest)}

			<InnerBlocks />
		</>
	);
};
