import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts/editor';
import { ImageEditor as ImageEditorComponent } from '../../../components/image/components/image-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ImageEditor = ({ attributes, setAttributes }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		blockName: manifestBlockName,
	} = manifest;

	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<ImageEditorComponent
				{...props(attributes, manifestBlockName, '', true)}
				setAttributes={setAttributes}
			/>
		</div>
	);
};
