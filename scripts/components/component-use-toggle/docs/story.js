import React, { useState } from 'react';
import { ComponentUseToggle } from '../component-use-toggle';
import readme from './readme.mdx';

export default {
	title: 'Options/ComponentUseToggle',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	const [current, setCurrent] = useState(false);

	return (
		<div>
			<h2>Show toggle</h2>
			<ComponentUseToggle
				label='My component'
				checked={current}
				onChange={(value) => setCurrent(value)}
				showUseToggle={true}
			/>

			<h2>Show label only</h2>
			<ComponentUseToggle
				label='My component'
				checked={current}
				onChange={(value) => setCurrent(value)}
				showUseToggle={false}
			/>
		</div>
	);
};
