import React from 'react';
import { CardToolbar as CardToolbarComponent } from '../../../components/card/components/card-toolbar';

export const CardToolbar = ({ attributes, setAttributes }) => {
	return (
		<CardToolbarComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
