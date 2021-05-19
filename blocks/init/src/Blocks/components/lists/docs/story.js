import React from 'react';
import { Fragment } from '@wordpress/element';
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

const props = manifest.example.attributes;

export const editor = () => (
	<ListsEditor {...props} />
);

export const options = () => (
	<ListsOptions {...props} />
);

export const size = () => (
	<Fragment>
		{manifest.options.listsSize.map((values, index) => (
			<Fragment key={index}>
				<ListsEditor
					{...props}
					listsContent={`<li>List Item ${values.label} 1</li><li>List Item ${values.label} 2</li>`}
					listsSize={values.value}
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
					{...props}
					listsContent={`<li>List Item ${values} 1</li><li>List Item ${values} 2</li>`}
					listsColor={values}
				/>
				<br /><br />
			</Fragment>
		))}
	</Fragment>
);
