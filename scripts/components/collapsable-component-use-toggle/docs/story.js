import React, { useState } from 'react';
import { CollapsableComponentUseToggle } from '../collapsable-component-use-toggle';
import readme from './readme.mdx';

export default {
	title: 'Options/CollapsableComponentUseToggle',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	const [current, setCurrent] = useState(true);

	return (
		<div>
			<h2>Default toggle</h2>
			<CollapsableComponentUseToggle
				label='My component'
				checked={current}
				onChange={(value) => setCurrent(value)}
				showUseToggle
				showLabel
			>
				<p>Content goes here</p>
			</CollapsableComponentUseToggle>
			
			<h2>Expanded by default</h2>
			<CollapsableComponentUseToggle
				label='My component'
				checked={current}
				onChange={(value) => setCurrent(value)}
				showUseToggle
				showLabel
				startOpen
			>
				<p>Content goes here</p>
			</CollapsableComponentUseToggle>
		</div>
	);
}
