import React, { useState } from 'react';
import { CollapsibleComponentUseToggle } from '../collapsible-component-use-toggle';
import readme from './readme.mdx';

export default {
	title: 'Options/CollapsibleComponentUseToggle',
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
			<CollapsibleComponentUseToggle
				label='My component'
				checked={current}
				onChange={(value) => setCurrent(value)}
				showUseToggle
				showLabel
			>
				<p>Content goes here</p>
			</CollapsibleComponentUseToggle>
			
			<h2>Expanded by default</h2>
			<CollapsibleComponentUseToggle
				label='My component'
				checked={current}
				onChange={(value) => setCurrent(value)}
				showUseToggle
				showLabel
				startOpen
			>
				<p>Content goes here</p>
			</CollapsibleComponentUseToggle>
		</div>
	);
}
