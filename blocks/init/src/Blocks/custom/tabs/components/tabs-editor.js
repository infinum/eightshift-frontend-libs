import React from 'react';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { checkAttr, getUnique } from '@eightshift/frontend-libs/scripts';
import { TabsPanel } from './tabs-panel.js';
import manifest from './../manifest.json';

export const TabsEditor = (props) => {
	const {attributes, clientId, inner} = props;
	const tabsAllowedBlocks = checkAttr('tabsAllowedBlocks', attributes, manifest);
	const newTabTemplate = [['eightshift-boilerplate/tab', {
		'tabTitle': __('New tab', 'eightshift-frontend-libs'),
		'tabId': getUnique(),
	}]];
	
	return (
		<>
			<TabsPanel
				childBlocks = {inner}
				activeTab = {checkAttr('tabsCurrentlyActiveTabId', attributes, manifest, true)}
				parentClientId = {clientId}
				{...props}
			/>
			<InnerBlocks
				allowedBlocks={(typeof tabsAllowedBlocks === 'undefined') || tabsAllowedBlocks}
				orientation="horizontal"
				template={newTabTemplate}
			/>
		</>
	);
}