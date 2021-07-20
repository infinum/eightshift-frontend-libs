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

export const component = () => {
	const [objData, setObjData] = useState({
		url: undefined,
		newTab: false,
	});

	return (
		<LinkEditComponent
			url={objData.url}
			opensInNewTab={objData.newTab}
			setAttributes={setObjData}
			title='Dummy component'
			textDomain='TestDomain'
			urlAttrName='url'
			isNewTabAttrName='newTab'
		/>
	);
}
