import React from 'react'; // eslint-disable-line no-unused-vars
import { VideoToolbar as VideoToolbarComponent } from '../../../components/video/components/video-toolbar';

export const VideoToolbar = ({ attributes, actions }) => {

	const {
		media,
	} = attributes;

	const {
		onChangeMedia,
	} = actions;

	const mediaObject = (typeof media === 'undefined') || media;

	return (
		<VideoToolbarComponent
			media={mediaObject}
			onChangeMedia={onChangeMedia}
		/>
	);
};
