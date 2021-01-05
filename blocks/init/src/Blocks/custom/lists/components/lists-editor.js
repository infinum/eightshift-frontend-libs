import React from 'react';
import { ListsEditor as ListsEditorComponent } from '../../../components/lists/components/lists-editor';

export const ListsEditor = ({ attributes, setAttributes }) => {
	return (
		<ListsEditorComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
