import React from 'react';
import { VideoToolbar as VideoToolbarComponent } from '../../../components/video/components/video-toolbar';

export const VideoToolbar = ({ attributes, setAttributes }) => {
	return (
		<VideoToolbarComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
