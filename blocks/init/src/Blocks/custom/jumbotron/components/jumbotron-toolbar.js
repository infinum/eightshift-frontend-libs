import React from 'react';
import { JumbotronToolbar as JumbotronToolbarComponent } from '../../../components/jumbotron/components/jumbotron-toolbar';

export const JumbotronToolbar = ({ attributes, setAttributes }) => {
	return (
		<JumbotronToolbarComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
