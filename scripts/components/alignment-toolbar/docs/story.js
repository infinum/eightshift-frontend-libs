import React from 'react';
import readme from './readme.mdx';
import { AlignmentToolbar, AlignmentToolbarType } from '../alignment-toolbar';

export default {
	title: `Options/AlignmentToolbar`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const text = () => (
	<>
		<span>All options</span>
		<AlignmentToolbar
			value='center'
		/>
		<br />
		<br />
		<span>Limited options</span>
		<AlignmentToolbar
			value='center'
			options={['center', 'right']}
		/>
	</>
);

export const horizontal = () => (
	<>
		<span>All options</span>
		<AlignmentToolbar
			value='center'
			type={AlignmentToolbarType.HORIZONTAL}
		/>
		<br />
		<br />
		<span>Limited options</span>
		<AlignmentToolbar
			value='center'
			options={['center', 'right']}
			type={AlignmentToolbarType.HORIZONTAL}
		/>
	</>
);

export const vertical = () => (
	<>
		<span>All options</span>
		<AlignmentToolbar
			value='center'
			type={AlignmentToolbarType.VERTICAL}
		/>
		<br />
		<br />
		<span>Limited options</span>
		<AlignmentToolbar
			value='center'
			type={AlignmentToolbarType.VERTICAL}
			options={['center', 'bottom']}
		/>
	</>
);
