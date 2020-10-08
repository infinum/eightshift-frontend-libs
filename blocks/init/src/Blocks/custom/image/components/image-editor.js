import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageEditor as ImageEditorComponent } from '../../../components/image/components/image-editor';

export const ImageEditor = ({ attributes, actions }) => {
	return (
		<ImageEditorComponent
			{...attributes}
			{...actions}
		/>
	);
};
