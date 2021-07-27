import { selector } from '@eightshift/frontend-libs/scripts/helpers';
import React from 'react';
import manifest from './../manifest.json';

export const TabsPanel = (props) => {

	const {
		childBlocks,
		activeTab,
		setAttributes
	} = props;

	const tabItems = childBlocks.map((block) => 
		{
			let classes = selector(manifest.tabPanelItemElement, manifest.blockClass, manifest.tabPanelItemElement);
			if(activeTab === block.tabId) classes += ` ${manifest.tabPanelItemActiveClass}`;
			
			return (
				<li
					key={block.tabId}
					className={classes}
				>
					<button
						onClick={() => {
							props.activeTab = block.tabId;
							wp.data.dispatch('core/block-editor').updateBlock(props.parentClientId, {'tabsCurrentlyActiveTabId': block.tabId});
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
		</>
	);
}