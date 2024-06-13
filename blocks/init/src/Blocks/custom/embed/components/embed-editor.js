import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts';
import { EmbedEditor as EmbedEditorComponent } from '../../../components/embed/components/embed-editor';
import manifest from '../manifest.json';
import globalManifest from '../../../manifest.json';

export const EmbedEditor = ({ attributes, setAttributes }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		blockClass,
	} = attributes;
	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<EmbedEditorComponent
				{...props('embed', attributes, {
					setAttributes: setAttributes,
				})}
			/>
		</div>
	);
};
