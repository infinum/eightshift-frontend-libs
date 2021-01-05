import React from 'react';
import { LinkToolbar as LinkToolbarComponent } from '../../../components/link/components/link-toolbar';

export const LinkToolbar = ({ attributes, setAttributes }) => {
	return (
		<LinkToolbarComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
