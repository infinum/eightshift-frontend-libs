import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageToolbar } from '../../../components/image/components/image-toolbar';

export const CarouselImageToolbar = ({ attributes, actions }) => {
	return (
		<ImageToolbar
			{...attributes}
			{...actions}
		/>
	);
};
