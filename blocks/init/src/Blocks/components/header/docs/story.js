import React from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { LayoutThreeColumnsEditor } from '../../layout-three-columns/components/layout-three-columns-editor';
import { editor as HamburgerEditor } from '../../hamburger/docs/story';
import { editor as LogoEditor } from '../../logo/docs/story';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const editor = () => (
	<LayoutThreeColumnsEditor
		selectorClass={'header'}
		layoutThreeColumnsLeft={[
			<LogoEditor key={'logo'} />,
		]}
		layoutThreeColumnsCenter={[
		]}
		layoutThreeColumnsRight={[
			<HamburgerEditor key={'hamburger'} />,
		]}
	/>
);
