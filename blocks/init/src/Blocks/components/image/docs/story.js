import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.md';
import manifest from './../manifest.json';
import { ImageEditor } from '../components/image-editor';
import { ImageOptions } from '../components/image-options';
import { ImageToolbar } from '../components/image-toolbar';

export default {
	title: `Components|${manifest.title}`,
	parameters: {
		notes: readme,
	},
};

const props = manifest.example.attributes;

export const editor = () => (
	<ImageEditor {...props} />
);

export const options = () => (
	<ImageOptions {...props} />
);

export const toolbar = () => (
	<ImageToolbar {...props} />
);

export const usePlaceholder = () => (
	<ImageEditor
		{...props}
		imageUrl={''}
		imageUsePlaceholder={true}
		imageBg={true}
	/>
);

export const backgroundImage = () => (
	<ImageEditor
		{...props}
		imageBg={true}
	/>
);

export const align = () => (
	<Fragment>
		{manifest.options.aligns.map((values, index) => (
			<Fragment key={index}>
				<ImageEditor
					{...props}
					imageAlign={values}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);
