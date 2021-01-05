import React from 'react';
import { ButtonEditor as ButtonEditorComponent } from '../../../components/button/components/button-editor';

export const ButtonEditor = ({ attributes, setAttributes }) => {
	return (
		<ButtonEditorComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
