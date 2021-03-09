import React from 'react';
import { CardToolbar as CardToolbarComponent } from '../../../components/card/components/card-toolbar';
import { options } from './../manifest.json';

export const CardToolbar = ({ attributes, setAttributes }) => {
	return (
		<CardToolbarComponent
			{...attributes}
			setAttributes={setAttributes}
			options={options}
		/>
	);
};
