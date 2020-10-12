import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { VideoEditor } from '../components/video-editor';
import { VideoOptions } from '../components/video-options';
import { VideoToolbar } from '../components/video-toolbar';

export default {
	title: 'Components|Video',
	parameters: {
		notes: readme,
	},
};

const props = {
	video: {
		id: 'DiItGE3eAyQ',
		url: '',
		type: 'youtube',
		aspectRatio: 'default',
	},
	onChangeVideoId: () => {},
	onChangeVideoAspectRatio: () => {},
	onChangeVideoType: () => {},
	onChangeVideoButtonUse: () => {},
};

export const YouTube = () => (
	<VideoEditor {...props} />
);

export const Vimeo = () => (
	<VideoEditor
		{...props}
		video={{
			...props.video,
			id: '53239989',
			type: 'vimeo',
		}}
	/>
);

export const Local = () => (
	<VideoEditor
		{...props}
		video={{
			...props.video,
			id: '',
			url: 'https://storage.googleapis.com/coverr-main/mp4%2FIn-The-Clouds.mp4',
			type: 'local',
		}}
	/>
);

export const LocalEmpty = () => (
	<VideoEditor
		{...props}
		video={{
			...props.video,
			id: '',
			url: '',
			type: 'local',
		}}
	/>
);

export const options = () => (
	<VideoOptions {...props} />
);

export const toolbar = () => (
	<VideoToolbar
		{...props}
		video={{
			...props.video,
			url: 'https://storage.googleapis.com/coverr-main/mp4%2FIn-The-Clouds.mp4',
		}}
	/>
);
