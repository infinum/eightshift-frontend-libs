import React from 'react';
import { getUnique, overrideInnerBlockSimpleWrapperAttributes } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';
import { TabEditor } from './components/tab-editor';
import { useSelect } from '@wordpress/data';
import manifest from './manifest.json';

export const Tab = (props) => {
	const {
		attributes,
		clientId,
		setAttributes
	} = props;

	const parentClientId = wp.data.select('core/block-editor').getBlockParentsByBlockName(clientId, ['eightshift-boilerplate/tabs'])[0];

	let activeTab;
	let setActiveTab;

	if (typeof(attributes.setActiveTab) !== 'undefined') {
		activeTab = attributes.activeTab;
		setActiveTab = attributes.setActiveTab;
	}
	else {
		const parentBlock = wp.data.select('core/block-editor').getBlockAttributes(parentClientId);
		activeTab = parentBlock.activeTab;
		setActiveTab = parentBlock.setActiveTab;
	}

	useSelect((select) => {
		overrideInnerBlockSimpleWrapperAttributes(select, clientId);
	});

	let tabId = checkAttr('tabId', attributes, manifest, true);

	if (typeof(tabId) === 'undefined') {
		tabId = getUnique();
		setAttributes({ [getAttrKey('tabId', attributes, manifest)]: tabId });
		setActiveTab(tabId);
	}

	if (activeTab === tabId) {
		props.active = true;
	}
	
	return (
		<TabEditor {...props} />
	);
}
