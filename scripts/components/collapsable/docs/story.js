import { Collapsable } from '../collapsable';
import readme from './readme.mdx';

export default {
	title: 'Options/Collapsable',
	parameters: {
		docs: {
			page: readme
		}
	},
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
