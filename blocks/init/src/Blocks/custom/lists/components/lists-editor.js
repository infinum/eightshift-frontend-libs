import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ListsEditor as ListsEditorComponent } from '../../../components/lists/components/lists-editor';
import manifest from './../manifest.json';

export const ListsEditor = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<ListsEditorComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
