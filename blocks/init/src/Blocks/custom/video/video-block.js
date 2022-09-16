import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { VideoEditor } from './components/video-editor';
import { VideoOptions } from './components/video-options';

export const Video = (props) => {
	return (
		<>
			<InspectorControls>
				<VideoOptions {...props} />
			</InspectorControls>
			<VideoEditor {...props} />
		</>
	);
};
