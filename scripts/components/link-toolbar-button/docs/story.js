import React from 'react';
import readme from './readme.mdx';
import { useRef, useState } from '@wordpress/element';
import { LinkToolbarButton } from '@eightshift/frontend-libs/scripts/components/link-toolbar-button/link-toolbar-button';

export default {
	title: 'Options/LinkToolbarButton',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	const ref = useRef();
	const [objData, setObjData] = useState({
		url: '',
		newTab: false,
	});

	return (
		<LinkToolbarButton
			componentName={'dummy-component'}
			url={objData.url}
			opensInNewTab={objData.newTab}
			setAttributes={setObjData}
			anchorRef={ref}
			title={'Dummy component'}
			textDomain={'TestDomain'}
		/>
	);
}
