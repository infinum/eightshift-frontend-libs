import React from 'react';
import { Fragment } from '@wordpress/element';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { ListsEditor } from '../components/lists-editor';
import { ListsOptions } from '../components/lists-options';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('lists', manifest);

export const editor = () => (
	<ListsEditor {...props('lists', attributes)} />
);

export const options = () => (
	<ListsOptions
		{...props('lists', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

export const size = () => (
	<Fragment>
		{manifest.options.listsSize.map((values, index) => (
			<Fragment key={index}>
				<ListsEditor
					{...props('lists', attributes, {
						listsContent: `<li>List Item ${values.label} 1</li><li>List Item ${values.label} 2</li>`,
						listsSize: values.value,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</Fragment>
);

export const color = () => (
	<Fragment>
		{manifest.options.listsColor.map((values, index) => (
			<Fragment key={index}>
				<ListsEditor
					{...props('lists', attributes, {
						listsContent: `<li>List Item ${values} 1</li><li>List Item ${values} 2</li>`,
						listsColor: values,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</Fragment>
);

export const colorOnlyMarkers = () => (
	<Fragment>
		{manifest.options.listsColor.map((values, index) => (
			<Fragment key={index}>
				<ListsEditor
					{...props('lists', attributes, {
						listsContent: `<li>List Item ${values} 1</li><li>List Item ${values} 2</li>`,
						listsColor: values,
						listsColorOnlyMarker: true,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</Fragment>
);
