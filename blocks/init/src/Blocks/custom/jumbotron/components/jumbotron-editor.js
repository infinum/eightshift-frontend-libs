import React from 'react';
import { JumbotronEditor as JumbotronEditorComponent } from '../../../components/jumbotron/components/jumbotron-editor';

export const JumbotronEditor = ({ attributes, setAttributes }) => {
	return (
		<JumbotronEditorComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
