import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts';
import { ImageEditor as ImageEditorComponent } from '../../../components/image/components/image-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ImageEditor = ({ attributes, setAttributes }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<ImageEditorComponent
				{...props('image', attributes, {
					setAttributes,
				})}
			/>
		</div>
	);
};
