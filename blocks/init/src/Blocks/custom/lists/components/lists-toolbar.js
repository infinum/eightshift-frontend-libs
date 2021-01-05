import React from 'react';
import { ListsToolbar as ListsToolbarComponent } from '../../../components/lists/components/lists-toolbar';

export const ListsToolbar = ({ attributes, setAttributes }) => {
	return (
		<ListsToolbarComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
