import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import manifest from '../manifest.json';
import { VideoButtonEditor } from '../components/video-button-editor';

export default {
	title: `Components|${manifest.title}`,
	parameters: {
		notes: readme,
	},
};

const props = manifest.example.attributes;

export const editor = () => (
	<VideoButtonEditor {...props} />
);
