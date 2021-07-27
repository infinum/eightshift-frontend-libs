import React from 'react';
import { getUnique, overrideInnerBlockSimpleWrapperAttributes } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';
import { InspectorControls } from '@wordpress/block-editor';
import { TabEditor } from './components/tab-editor';
import { TabOptions } from './components/tab-options';
import { useSelect } from '@wordpress/data';
import manifest from './manifest.json';

export const Tab = (props) => {
	const {
		attributes,
		clientId,
		setAttributes
	} = props;

	useSelect((select) => {
		overrideInnerBlockSimpleWrapperAttributes(select, clientId);
	});

	let tabId = checkAttr('tabId', attributes, manifest, true);

	if(tabId === "newTab") {
		tabId = getUnique();
		setAttributes({ [getAttrKey('tabId', attributes, manifest)]: tabId })
	}

	const parentClientId = wp.data.select('core/block-editor').getBlockParentsByBlockName(clientId, ['eightshift-boilerplate/tabs'])[0];
	const activeTab = wp.data.select('core/block-editor').getBlockAttributes(parentClientId).tabsCurrentlyActiveTabId;
	if(activeTab === tabId){
		props.active = true;
	}

	return (
		<>
			<InspectorControls>
				<TabOptions {...props} />
			</InspectorControls>
			<TabEditor {...props} />
		</>
		);
	}