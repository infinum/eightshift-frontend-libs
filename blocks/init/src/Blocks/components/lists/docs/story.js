import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { ListsEditor } from '../components/lists-editor';

export default {
	title: 'Components|Lists',
	parameters: {
		notes: readme,
	},
};

const props = {
	blockClass: 'block-lists',
	lists: {
		content: '<li>List Item 1</li><li>List Item 2</li><li>List Item 3</li>',
		ordered: 'ul',
	},
	onChangeListsContent: () => {},
	onChangeListsOrdered: () => {},
	onChangeListsUse: () => {},
};

export const editor = () => (
	<ListsEditor {...props} />
);

export const ordered = () => (
	<ListsEditor
		{...props}
		lists={{
			...props.lists,
			ordered: 'ol',
		}}
	/>
);
