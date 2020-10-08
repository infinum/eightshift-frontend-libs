import React from 'react'; // eslint-disable-line no-unused-vars
import { VideoToolbar as VideoToolbarComponent } from '../../../components/video/components/video-toolbar';

export const VideoToolbar = ({ attributes, actions }) => {
	return (
		<VideoToolbarComponent
			{...attributes}
			{...actions}
		/>
	);
};
