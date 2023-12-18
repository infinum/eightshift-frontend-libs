import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { ImageEditor } from '../components/image-editor';
import { ImageOptions } from '../components/image-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Image',
};

const attributes = getExample('image', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<ImageEditor {...props('image', attributes)} />
	</GetStoryComponentDescription>
);

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<ImageOptions
			{...props('image', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	</GetStoryComponentDescription>
);

export const fullScreen = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<ImageEditor
			{...props('image', attributes, {
				imageUrl: 'https://loremflickr.com/300/200',
				imageFull: true,
			})}
		/>
	</GetStoryComponentDescription>
);
