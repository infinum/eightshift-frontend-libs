import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { VideoEditor } from '../components/video-editor';
import { VideoOptions } from '../components/video-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Video',
};

const attributes = getExample('video', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<VideoEditor {...props('video', attributes)} />
	</GetStoryComponentDescription>
);
export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<VideoOptions
		{...props('video', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	</GetStoryComponentDescription>
);
