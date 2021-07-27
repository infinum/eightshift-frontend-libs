import React from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { checkAttr, getUnique, selector } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const TabsEditor = (props) => {
	const {
		attributes,
		parentClientId,
		inner,
		setAttributes
	} = props;
	const tabsAllowedBlocks = checkAttr('tabsAllowedBlocks', attributes, manifest);
	const newTabTemplate = [['eightshift-boilerplate/tab', {
		'tabTitle': __('New tab', 'eightshift-frontend-libs'),
		'tabId': getUnique(),
	}]];
	const activeTab = checkAttr('tabsCurrentlyActiveTabId', attributes, manifest, true);

	const tabItems = inner.map((block) => 
		{
			const classes = classnames([
				selector(manifest.tabPanelItemElement, manifest.blockClass, manifest.tabPanelItemElement),
				activeTab === block.tabId ? manifest.tabPanelItemActiveClass : ''
			])
			return (
				<li
					key={block.tabId}
					className={classes}
				>
					<button
						onClick={() => {
							wp.data.dispatch('core/block-editor').updateBlock(parentClientId, {'tabsCurrentlyActiveTabId': block.tabId});
							setAttributes({"tabsCurrentlyActiveTabId": block.tabId})
						}}
						className={selector(manifest.tabPanelItemButtonElement, manifest.blockClass, manifest.tabPanelItemButtonElement)}
					>
						{block.tabTitle}
					</button>
				</li>
			);
		}
	);


	
	return (
		<>
			<ul className="block-tabpanel">
				{tabItems}
			</ul>
			
			<InnerBlocks
				allowedBlocks={(typeof tabsAllowedBlocks === 'undefined') || tabsAllowedBlocks}
				orientation="horizontal"
				template={newTabTemplate}
			/>
		</>
	);
}