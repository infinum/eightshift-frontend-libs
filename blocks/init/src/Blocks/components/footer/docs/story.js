import React from 'react';
import readme from './readme.mdx';
import manifest from '../manifest.json';
import { editor as CopyrightEditor } from '../../copyright/docs/story';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

export const editor = () => (
	<div></div>
	// <LayoutThreeColumnsEditor
	// 	selectorClass={manifest.componentClass}
	// 	layoutThreeColumnsLeft={[
	// 		<CopyrightEditor key={'copyright'} />,
	// 	]}
	// 	layoutThreeColumnsCenter={[
	// 	]}
	// 	layoutThreeColumnsRight={[
	// 	]}
	// />
);
