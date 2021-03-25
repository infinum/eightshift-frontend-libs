import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ImageEditor as ImageEditorComponent } from '../../../components/image/components/image-editor';
import manifest from './../manifest.json';

export const ImageEditor = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<ImageEditorComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
