import React from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const editor = () => (
	<div />
	// <LayoutThreeColumnsEditor
	// 	selectorClass={'header'}
	// 	layoutThreeColumnsLeft={[
	// 		<LogoEditor key={'logo'} />,
	// 	]}
	// 	layoutThreeColumnsCenter={[
	// 	]}
	// 	layoutThreeColumnsRight={[
	// 		<HamburgerEditor key={'hamburger'} />,
	// 	]}
	// />
);
