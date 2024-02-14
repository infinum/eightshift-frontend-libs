import React from 'react';
import { useState } from '@wordpress/element';
import { LinkInput } from '../link-input';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/LinkInput',
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
					<LinkInput
						url={objData.url}
						opensInNewTab={objData.newTab}
						onChange={({ url, newTab, isAnchor }) => {
							setObjData({ url, newTab, isAnchor });
						}}
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='No "New tab" option'>
					<LinkInput
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
					<LinkInput
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
					<LinkInput
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
