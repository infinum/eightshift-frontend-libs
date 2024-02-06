import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { VideoEditor } from '../components/video-editor';
import { VideoOptions } from '../components/video-options';

export default {
	title: 'Components/Video',
};

const attributes = getExample('video', manifest);

export const editor = () => (
	<VideoEditor {...props('video', attributes)} />
);
export const options = () => (
	<VideoOptions
		{...props('video', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);
