import React, { useMemo } from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const GroupEditor = ({ attributes }) => {
	const {
		blockClass,
	} = attributes;

	const unique = useMemo(() => getUnique(), []);

	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<InnerBlocks />
		</div>
	);
};
