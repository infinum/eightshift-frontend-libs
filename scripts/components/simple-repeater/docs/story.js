import React from 'react';
import readme from './readme.mdx';
import { useState } from '@wordpress/element';
import { TextControl } from '@wordpress/components';
import { Repeater, RepeaterItem, icons } from '@eightshift/frontend-libs/scripts';

export default {
	title: 'Options/Repeater',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const basicComponent = () => {
	const [attributes, setAttributes] = useState({
		videoCaptions: [
			{
				id: 1,
				title: 'Item 1',
				icon: icons.num1Circle,
			},
			{
				id: 2,
				title: 'Item 2',
				icon: icons.num2Circle,
			},
			{
				id: 3,
				title: 'Item 3',
				icon: icons.num3Circle,
			}
		],
	});

	return (
		<div className='es-max-w-84'>
			<Repeater
			icon={icons.videoSubtitleAlt}
			label='Captions'
			items={attributes.videoCaptions}
			attributeName='videoCaptions'
			setAttributes={setAttributes}
		>
			{attributes.videoCaptions.map((item, i) => (
				<RepeaterItem
					key={i}
					icon={item?.icon ?? icons.experiment}
					title={item.title}
				>
					<TextControl
						value={item.title}
						onChange={(value) => {
							const newArray = [...attributes.videoCaptions];
							newArray[i].title = value;

							setAttributes({videoCaptions: newArray}); // You would use getAttributeKey here.
						}}
					/>
				</RepeaterItem>
			))}
		</Repeater>
		</div>
	);
};
