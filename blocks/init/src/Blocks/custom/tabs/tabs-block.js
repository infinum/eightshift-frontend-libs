import React, { useState } from 'react';
import { TabsEditor } from './components/tabs-editor';

export const Tabs = (props) => {
	const {
		clientId
	} = props;

	const tabsBlock = wp.data.select('core/block-editor').getBlock(clientId);
	
	const inner = tabsBlock.innerBlocks.map((tab) => {
		tab.attributes.clientId = tab.clientId;
		return tab.attributes;
	});

	let defaultTabId;
	if (!Array.isArray(inner) || !inner.length) {
		defaultTabId = undefined;
	}
	else {
		defaultTabId = inner[0].tabId;
	}

	props.inner = inner;
	const [activeTab, setActiveTab] = useState(defaultTabId);
	props.attributes.activeTab = activeTab;
	props.attributes.setActiveTab = setActiveTab;

	
	tabsBlock.innerBlocks.forEach((tab) => {
		wp.data.dispatch('core/block-editor').updateBlockAttributes(tab.clientId, { activeTab: activeTab, setActiveTab: setActiveTab })
	})

	return (
		<>
			<TabsEditor {...props} />
		</>
	);
};