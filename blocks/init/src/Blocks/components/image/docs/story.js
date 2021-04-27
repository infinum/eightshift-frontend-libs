import React from 'react';
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

const props = manifest.example.attributes;

export const editor = () => (
	<ImageEditor
		{...props}
		imageUrl={{
			id: "0",
			url: "image.jpg"
		}}
	/>
);

export const options = () => (
	<ImageOptions {...props} />
);

export const fullScreen = () => (
	<ImageEditor
	{...props}
	imageUrl={{
		id: "0",
		url: "https://loremflickr.com/300/200"
	}}
	imageFull={true}
	/>
);
