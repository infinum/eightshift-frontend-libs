import React from 'react';
import { Fragment } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { VideoEditor } from './components/video-editor';
import { VideoOptions } from './components/video-options';
import { VideoToolbar } from './components/video-toolbar';

export const Video = (props) => {
	return (
		<Fragment>
			<InspectorControls>
				<VideoOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<VideoToolbar {...props} />
			</BlockControls>
			<VideoEditor {...props} />
		</Fragment>
	);
};
