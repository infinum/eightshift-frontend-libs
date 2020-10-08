import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageToolbar as ImageToolbarComponent } from '../../../components/image/components/image-toolbar';

export const ImageToolbar = ({ attributes, actions }) => {
	return (
		<ImageToolbarComponent
			{...attributes}
			{...actions}
		/>
	);
};
