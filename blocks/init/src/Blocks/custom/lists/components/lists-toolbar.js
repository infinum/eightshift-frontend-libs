import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ListsToolbar as ListsToolbarComponent } from '../../../components/lists/components/lists-toolbar';
import manifest from './../manifest.json';

export const ListsToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<ListsToolbarComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
