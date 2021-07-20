import React from 'react';
import readme from './readme.mdx';
import { useState } from '@wordpress/element';
import { LinkToolbarButton } from '@eightshift/frontend-libs/scripts/components/link-toolbar-button/link-toolbar-button';

export default {
	title: 'Options/LinkToolbarButton',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const basicComponent = () => {
	const [objData, setObjData] = useState({
		url: '',
		newTab: false,
	});

	return (
		<LinkToolbarButton
			url={objData.url}
			opensInNewTab={objData.newTab}
			setAttributes={setObjData}
			title={'Dummy component'}
			textDomain={'TestDomain'}
			urlAttrName='url'
			isNewTabAttrName='newTab'
		/>
	);
}

export const withoutNewTabOption = () => {
	const [objData, setObjData] = useState({
		url: '',
	});

	return (
		<LinkToolbarButton
			url={objData.url}
			setAttributes={setObjData}
			title={'Dummy component'}
			textDomain={'TestDomain'}
			urlAttrName='url'
			showNewTabOption={false}
		/>
	);
}
