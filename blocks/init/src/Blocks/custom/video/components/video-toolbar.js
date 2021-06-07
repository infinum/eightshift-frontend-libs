import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { VideoToolbar as VideoToolbarComponent } from '../../../components/video/components/video-toolbar';
import manifest from './../manifest.json';

export const VideoToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
	} = manifest;

	return (
		<VideoToolbarComponent
			{...props(attributes, manifestBlockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
