import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts';
import { JumbotronEditor as JumbotronEditorComponent } from '../../../components/jumbotron/components/jumbotron-editor';

export const JumbotronEditor = ({ attributes, setAttributes }) => {
	return (
		<JumbotronEditorComponent
			{...props('jumbotron', attributes, {
				setAttributes,
			})}
		/>
	);
};
