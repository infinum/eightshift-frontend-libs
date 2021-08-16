import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { ImageEditor } from '../components/image-editor';
import { ImageOptions } from '../components/image-options';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('image', manifest);

export const editor = () => (
	<ImageEditor {...props('image', attributes)} />
);

export const options = () => (
	<ImageOptions
		{...props('image', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

export const fullScreen = () => (
	<ImageEditor
		{...props('image', attributes, {
			imageUrl: 'https://loremflickr.com/300/200',
			imageFull: true,
		})}
	/>
);
