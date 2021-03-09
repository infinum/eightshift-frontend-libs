import React from 'react';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { VideoEditor } from './components/video-editor';
import { VideoOptions } from './components/video-options';
import { VideoToolbar } from './components/video-toolbar';

export const Video = (props) => {
	return (
		<>
			<InspectorControls>
				<VideoOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<VideoToolbar {...props} />
			</BlockControls>
			<VideoEditor {...props} />
		</>
	);
};
