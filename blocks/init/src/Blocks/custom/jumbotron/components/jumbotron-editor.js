import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { JumbotronEditor as JumbotronEditorComponent } from '../../../components/jumbotron/components/jumbotron-editor';

export const JumbotronEditor = ({ attributes, setAttributes }) => {
	return (
		<JumbotronEditorComponent
			{...props(attributes, 'jumbotron')}
			setAttributes={setAttributes}
		/>
	);
};
