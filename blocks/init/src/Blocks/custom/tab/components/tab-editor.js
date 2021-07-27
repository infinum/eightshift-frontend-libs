import React from 'react';
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import manifest from './../manifest.json';
import tabsManifest from './../../tabs/manifest.json';

export const TabEditor = ({active}) => {
	const tabClassnames = classnames([
		manifest.blockJsClass,
		manifest.blockClass,
		active ? tabsManifest.tabVisibleClass : ''
	]);
	return (
		<div className={tabClassnames}>
			<InnerBlocks />
		</div>
	);
};
