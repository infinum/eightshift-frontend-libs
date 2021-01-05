import React from 'react';
import { ImageToolbar as ImageToolbarComponent } from '../../../components/image/components/image-toolbar';

export const ImageToolbar = ({ attributes, setAttributes }) => {
	return (
		<ImageToolbarComponent
			{...attributes}
			setAttributes={setAttributes}
		/>
	);
};
