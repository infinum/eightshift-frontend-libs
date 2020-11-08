import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.md';
import manifest from './../manifest.json';
import { VideoEditor } from '../components/video-editor';
import { VideoOptions } from '../components/video-options';
import { VideoToolbar } from '../components/video-toolbar';

export default {
	title: `Components|${manifest.title}`,
	parameters: {
		notes: readme,
	},
};

const props = manifest.example.attributes;

export const YouTube = () => (
	<VideoEditor {...props} />
);

export const Vimeo = () => (
	<VideoEditor
		{...props}
		videoType="vimeo"
		videoUrl="53239989"
	/>
);

export const Local = () => (
	<VideoEditor
		{...props}
		videoType="local"
		videoUrl="https://storage.googleapis.com/coverr-main/mp4%2FIn-The-Clouds.mp4"
	/>
);

export const options = () => (
	<VideoOptions {...props} />
);

export const toolbar = () => (
	<VideoToolbar {...props} />
);

export const align = () => (
	<Fragment>
		{manifest.options.aligns.map((values, index) => (
			<Fragment key={index}>
				<VideoEditor
					{...props}
					VideoAlign={values}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);


// const props = {
// 	video: {
// 		id: 'DiItGE3eAyQ',
// 		url: '',
// 		type: 'youtube',
// 		aspectRatio: 'default',
// 	},
// 	onChangeVideoId: () => {},
// 	onChangeVideoAspectRatio: () => {},
// 	onChangeVideoType: () => {},
// 	onChangeVideoButtonUse: () => {},
// };

// export const YouTube = () => (
// 	<VideoEditor {...props} />
// );

// export const Vimeo = () => (
// 	<VideoEditor
// 		{...props}
// 		video={{
// 			...props.video,
// 			id: '53239989',
// 			type: 'vimeo',
// 		}}
// 	/>
// );

// export const Local = () => (
// 	<VideoEditor
// 		{...props}
// 		video={{
// 			...props.video,
// 			id: '',
// 			url: 'https://storage.googleapis.com/coverr-main/mp4%2FIn-The-Clouds.mp4',
// 			type: 'local',
// 		}}
// 	/>
// );

// export const LocalEmpty = () => (
// 	<VideoEditor
// 		{...props}
// 		video={{
// 			...props.video,
// 			id: '',
// 			url: '',
// 			type: 'local',
// 		}}
// 	/>
// );

// export const options = () => (
// 	<VideoOptions {...props} />
// );

// export const toolbar = () => (
// 	<VideoToolbar
// 		{...props}
// 		video={{
// 			...props.video,
// 			url: 'https://storage.googleapis.com/coverr-main/mp4%2FIn-The-Clouds.mp4',
// 		}}
// 	/>
// );
