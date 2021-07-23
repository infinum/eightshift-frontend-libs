import React from 'react';
import readme from './readme.mdx';
import manifest from '../manifest.json';
import { AlignmentToolbar, AlignmentToolbarType } from '../alignment-toolbar';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const text = () => (
	<>
		<AlignmentToolbar
			value='center'
		/>
		<AlignmentToolbar
			value='center'
			options={['center', 'right']}
		/>
	</>
);

export const horizontal = () => (
	<>
		<AlignmentToolbar
			value='center'
			type={AlignmentToolbarType.HORIZONTAL}
		/>
		<AlignmentToolbar
			value='center'
			options={['center', 'right']}
			type={AlignmentToolbarType.HORIZONTAL}
		/>
	</>
);

export const vertical = () => (
	<>
		<AlignmentToolbar
			value='center'
			type={AlignmentToolbarType.VERTICAL}
		/>

		<AlignmentToolbar
			value='center'
			type={AlignmentToolbarType.VERTICAL}
			options={['center', 'bottom']}
		/>
	</>
);
