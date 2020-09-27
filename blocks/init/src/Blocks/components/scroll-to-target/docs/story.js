import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { ScrollToTargetEditor } from '../components/scroll-to-target-editor';
import { ScrollToTargetOptions } from '../components/scroll-to-target-options';

export default {
	title: 'Components|Scroll To Target',
	parameters: {
		notes: readme,
	},
};

const editorProps = {
	scrollText: 'Scroll to target',
};

const optionsProps = {
	scrollText: 'Scroll to target',
	scrollTarget: '',
	onChangeScrollText: () => { },
	onChangeScrollTarget: () => { },
};

export const component = () => (
	<ScrollToTargetEditor
		{...editorProps}
	/>
);

export const options = () => (
	<ScrollToTargetOptions
		{...optionsProps}
	/>
);
