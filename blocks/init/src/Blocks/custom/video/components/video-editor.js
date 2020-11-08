import React from 'react'; // eslint-disable-line no-unused-vars
import { VideoEditor as VideoEditorComponent } from '../../../components/video/components/video-editor';

export const VideoEditor = ({ attributes, setAttributes }) => {
	return (
		<VideoEditorComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
