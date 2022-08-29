import React from 'react';
import readme from './readme.mdx';
import { useState } from '@wordpress/element';
import { TextControl } from '@wordpress/components';
import { SimpleRepeater, SimpleRepeaterItem, icons } from '@eightshift/frontend-libs/scripts';

export default {
	title: 'Options/SimpleRepeater',
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
				title: 'This is a demo',
			},
		],
	});

	return (

		<SimpleRepeater
			icon={icons.videoSubtitleAlt}
			label='Captions'
			items={attributes.videoCaptions}
			attributeName='videoCaptions'
			setAttributes={setAttributes}
		>
			{attributes.videoCaptions.map((item, i) => (
				<SimpleRepeaterItem
					key={item.id}
					icon={icons.experiment}
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
				</SimpleRepeaterItem>
			))}
		</SimpleRepeater>
	);
};
