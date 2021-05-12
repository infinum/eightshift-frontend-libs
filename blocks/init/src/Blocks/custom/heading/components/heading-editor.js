import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts/editor';
import { HeadingEditor as HeadingEditorComponent } from '../../../components/heading/components/heading-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const HeadingEditor = ({ attributes, setAttributes }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		blockName,
	} = manifest;

	const {
		blockClass,
	} = attributes;

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<div className={blockClass} data-id={unique}>
				<HeadingEditorComponent
					setAttributes={setAttributes}
					{...props(attributes, blockName, '', true)}
				/>
			</div>
		</>
	);
};
