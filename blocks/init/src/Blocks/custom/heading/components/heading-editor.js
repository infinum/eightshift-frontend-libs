import React from 'react';
import { HeadingEditor as HeadingEditorComponent } from '../../../components/heading/components/heading-editor';

export const HeadingEditor = ({ attributes, setAttributes }) => {
	return (
		<HeadingEditorComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
