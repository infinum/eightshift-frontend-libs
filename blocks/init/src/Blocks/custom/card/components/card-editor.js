import React from 'react';
import { CardEditor as CardEditorComponent } from '../../../components/card/components/card-editor';

export const CardEditor = ({ attributes, setAttributes }) => {
	return (
		<CardEditorComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
