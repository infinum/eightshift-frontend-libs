import React from 'react';
import readme from './readme.mdx';
import { useState } from '@wordpress/element';
import { LinkEditComponent } from '@eightshift/frontend-libs/scripts/components/link-edit-component/link-edit-component';

export default {
	title: 'Options/LinkEditComponent',
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
		<LinkEditComponent
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
		<LinkEditComponent
			url={objData.url}
			setAttributes={setObjData}
			title={'Dummy component'}
			textDomain={'TestDomain'}
			urlAttrName='url'
			showNewTabOption={false}
		/>
	);
}
