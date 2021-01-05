import React from 'react';
import { LinkEditor as LinkEditorComponent } from '../../../components/link/components/link-editor';

export const LinkEditor = ({ attributes, setAttributes }) => {
	return (
		<LinkEditorComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
