import React from 'react';
import { ButtonToolbar as ButtonToolbarComponent } from '../../../components/button/components/button-toolbar';

export const ButtonToolbar = ({ attributes, setAttributes }) => {
	return (
		<ButtonToolbarComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
