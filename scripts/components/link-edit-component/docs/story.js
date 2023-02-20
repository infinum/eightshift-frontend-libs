import React from 'react';
import readme from './readme.mdx';
import { useState } from '@wordpress/element';
import { LinkEditComponent } from '../link-edit-component';
import { SingleItemShowcase } from '../../../storybook/helpers';

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
		url: '',
		newTab: false,
		isAnchor: false,
	});

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Link picker</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Base picker'>
					<LinkEditComponent
						url={objData.url}
						opensInNewTab={objData.newTab}
						onChange={({ url, newTab, isAnchor }) => {
							setObjData({ url, newTab, isAnchor });
						}}
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='No "New tab" option'>
					<LinkEditComponent
						url={objData.url}
						opensInNewTab={objData.newTab}
						onChange={({ url, newTab, isAnchor }) => {
							setObjData({ url, newTab, isAnchor });
						}}
						noBottomSpacing
						hideOpensInNewTab
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='No anchor notice'>
					<LinkEditComponent
						url={objData.url}
						opensInNewTab={objData.newTab}
						onChange={({ url, newTab, isAnchor }) => {
							setObjData({ url, newTab, isAnchor });
						}}
						noBottomSpacing
						hideAnchorNotice
					/>
				</SingleItemShowcase>

					<SingleItemShowcase title='Disabled'>
					<LinkEditComponent
						url={objData.url}
						opensInNewTab={objData.newTab}
						onChange={({ url, newTab, isAnchor }) => {
							setObjData({ url, newTab, isAnchor });
						}}
						noBottomSpacing
						disabled
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
