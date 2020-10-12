import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { ImageEditor } from '../components/image-editor';
import { ImageToolbar } from '../components/image-toolbar';
import { ImageOptions } from '../components/image-options';

export default {
	title: 'Components|Image',
	parameters: {
		notes: readme,
	},
};

const props = {
	blockClass: 'block-image',
	bgImg: false,
	usePlaceholder: false,
	media: {
		id: 0,
		url: 'https://picsum.photos/400/400',
	},
	onChangeMedia: () => {},
	onChangeMediaUse: () => {},
};

export const component = () => (
	<ImageEditor {...props} />
);

export const options = () => (
	<ImageOptions
		{...props}
		media={{
			url: '',
		}}
	/>
);

export const toolbar = () => (
	<ImageToolbar {...props} />
);

export const BgImage = () => (
	<ImageEditor
		{...props}
		bgImg={true}
	/>
);

export const Upload = () => (
	<ImageEditor
		{...props}
		media={{
			url: '',
		}}
		usePlaceholder={false}
	/>
);

export const Placeholder = () => (
	<ImageEditor
		{...props}
		media={{
			url: '',
		}}
		bgImg={true}
		usePlaceholder={true}
	/>
);
