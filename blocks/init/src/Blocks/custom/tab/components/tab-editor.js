import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import manifest from './../manifest.json';
import tabsManifest from './../../tabs/manifest.json';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';

export const TabEditor = ({attributes, active}) => {
	const tabId = checkAttr('tabId', attributes, manifest, true);
	const visibilityClass = active ? tabsManifest.tabVisibleClass : '';
	const tabClassnames = `block-tab js-tab-${tabId} ${visibilityClass}`;
	return (
		<div className={tabClassnames}>
		<InnerBlocks />
		</div>
	);
};
