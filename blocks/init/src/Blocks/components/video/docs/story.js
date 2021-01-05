import React from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { VideoEditor } from '../components/video-editor';
import { VideoOptions } from '../components/video-options';
import { VideoToolbar } from '../components/video-toolbar';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const props = manifest.example.attributes;

export const editorYouTube = () => (
	<VideoEditor {...props} />
);

export const editorVimeo = () => (
	<VideoEditor
		{...props}
		videoType={'vimeo'}
		videoUrl={'99635565'}
	/>
);

export const editorLocal = () => (
	<VideoEditor
		{...props}
		videoType={'local'}
		videoUrl={'https://storage.googleapis.com/coverr-main/mp4%2FIn-The-Clouds.mp4'}
	/>
);

export const editorLocalWithUpload = () => (
	<VideoEditor
		{...props}
		videoType={'local'}
		videoUrl={''}
	/>
);

export const editorWithPlaceholder = () => (
	<VideoEditor
		{...props}
		videoType={'local'}
		videoUrl={''}
		videoUsePlaceholder={true}
	/>
);

export const options = () => (
	<VideoOptions {...props} />
);


export const optionsWithUpload = () => (
	<VideoOptions
		{...props}
		videoUrl={''}
		videoUsePlaceholder={true}
	/>
);

export const toolbar = () => (
	<VideoToolbar {...props} />
);
