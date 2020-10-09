import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { VideoButtonEditor } from '../components/video-button-editor';

export default {
	title: 'Components|Video Button',
	parameters: {
		notes: readme,
	},
};

const props = {
	modalId: 'testID',
};

export const component = () => (
	<VideoButtonEditor {...props} />
);
