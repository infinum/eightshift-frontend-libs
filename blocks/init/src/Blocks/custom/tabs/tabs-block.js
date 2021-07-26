import React from 'react';
import { TabsEditor } from './components/tabs-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './manifest.json';


export const Tabs = (props) => {
	const { clientId, setAttributes, attributes } = props;
	const tabsBlock = wp.data.select('core/block-editor').getBlock(clientId);
	let inner = [];
	tabsBlock.innerBlocks.forEach((tab) => {
		inner.push(tab.attributes);
	});
	props.inner = inner;
	
	if(checkAttr('tabsCurrentlyActiveTabId', attributes, manifest, true) === undefined){
		setAttributes({"tabsCurrentlyActiveTabId": inner[0] ? inner[0].tabId : undefined});
	}
	
	return (
		<>
		<TabsEditor {...props}
		/>
		</>
	);
};
	