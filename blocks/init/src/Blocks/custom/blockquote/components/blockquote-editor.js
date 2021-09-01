import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts';
import { BlockquoteEditor as BlockquoteEditorComponent } from '../../../components/blockquote/components/blockquote-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const BlockquoteEditor = ({ attributes, setAttributes }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<BlockquoteEditorComponent
				{...props('blockquote', attributes, {
					setAttributes: setAttributes,
				})}
			/>
		</div>
	);
};
