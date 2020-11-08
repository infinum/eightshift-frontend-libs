import React from 'react'; // eslint-disable-line no-unused-vars
import { VideoToolbar as VideoToolbarComponent } from '../../../components/video/components/video-toolbar';

export const VideoToolbar = ({ attributes, setAttributes }) => {
	return (
		<VideoToolbarComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
