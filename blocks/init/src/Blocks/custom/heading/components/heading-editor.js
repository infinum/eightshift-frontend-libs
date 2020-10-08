import React from 'react'; // eslint-disable-line no-unused-vars
import { HeadingEditor as HeadingEditorComponent } from '../../../components/heading/components/heading-editor';

export const HeadingEditor = ({ attributes, actions }) => {
	return (
		<HeadingEditorComponent
			{...attributes}
			{...actions}
		/>
	);
};
