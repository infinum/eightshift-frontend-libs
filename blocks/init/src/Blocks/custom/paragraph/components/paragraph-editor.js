import React from 'react';
import { ParagraphEditor as ParagraphEditorComponent } from '../../../components/paragraph/components/paragraph-editor';

export const ParagraphEditor = ({ attributes, setAttributes }) => {
	return (
		<ParagraphEditorComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
