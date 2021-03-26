import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { VideoToolbar as VideoToolbarComponent } from '../../../components/video/components/video-toolbar';
import manifest from './../manifest.json';

export const VideoToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<VideoToolbarComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
