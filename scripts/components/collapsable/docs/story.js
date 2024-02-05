import React from 'react';
import { Collapsable } from '../collapsable';

export default {
	title: 'Options/Collapsable',
};

export const component = () => {
	return (
		<div>
			<h2>Default</h2>
			<Collapsable
				label='Block options'
			>
				<p>Options go here.</p>
			</Collapsable>

			<h2>Start open</h2>
			<Collapsable
				label='Block options'
				startOpen={true}
			>
				<p>Options go here.</p>
			</Collapsable>

			<h2>No expander icon</h2>
			<Collapsable
				label='Block options'
				showExpanderIcon={false}
			>
				<p>Options go here.</p>
			</Collapsable>
		</div>
	);
};
