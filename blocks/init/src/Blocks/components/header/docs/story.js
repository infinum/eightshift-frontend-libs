import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import manifest from './../manifest.json';
import { LayoutThreeColumnsEditor } from './../../layout-three-colums/components/layout-three-columns-editor';
import { editor as HamburgerEditor } from '../../hamburger/docs/story';
import { editor as LogoEditor } from '../../logo/docs/story';

export default {
	title: `Components|${manifest.title}`,
	parameters: {
		notes: readme,
	},
};

export const editor = () => (
	<LayoutThreeColumnsEditor
		selectorClass={'header'}
		layoutLeft={[
			<HamburgerEditor key={'hamburger'} />,
		]}
		layoutCenter={[
			<LogoEditor key={'logo'} />,
		]}
		layoutRight={[
		]}
	/>
);
