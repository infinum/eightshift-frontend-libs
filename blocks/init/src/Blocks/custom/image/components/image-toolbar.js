import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ImageToolbar as ImageToolbarComponent } from '../../../components/image/components/image-toolbar';
import manifest from './../manifest.json';

export const ImageToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<ImageToolbarComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
