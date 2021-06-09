import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { VideoEditor as VideoEditorComponent } from '../../../components/video/components/video-editor';
import manifest from './../manifest.json';

export const VideoEditor = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
	} = manifest;

	return (
		<VideoEditorComponent
			{...props(attributes, manifestBlockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
