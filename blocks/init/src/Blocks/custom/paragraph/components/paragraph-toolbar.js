import React from 'react'; // eslint-disable-line no-unused-vars
import { ParagraphToolbar as ParagraphToolbarComponent } from '../../../components/paragraph/components/paragraph-toolbar';

export const ParagraphToolbar = ({ attributes, actions }) => {
	return (
		<ParagraphToolbarComponent
			{...attributes}
			{...actions}
		/>
	);
};
