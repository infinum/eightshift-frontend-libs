import React from 'react';
import { CardToolbar as CardToolbarCompnent } from '../../../components/card/components/card-toolbar';

export const CardToolbar = ({ attributes, setAttributes }) => {
	return (
		<CardToolbarCompnent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
