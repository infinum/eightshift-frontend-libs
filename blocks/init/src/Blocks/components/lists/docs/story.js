import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { ListsEditor } from '../components/lists-editor';

export default {
	title: 'Components|Lists',
	parameters: {
		notes: readme,
	},
};

const editorProps = {
	blockClass: 'block-lists',
	lists: {
		content: '<li>List Item 1</li><li>List Item 2</li><li>List Item 3</li>',
		ordered: 'ul',
	},
};

export const editor = () => (
	<ListsEditor
		{...editorProps}
	/>
);

export const ordered = () => (
	<ListsEditor
		lists={{
			...editorProps.lists,
			ordered: 'ol',
		}}
		{...editorProps}
	/>
);
