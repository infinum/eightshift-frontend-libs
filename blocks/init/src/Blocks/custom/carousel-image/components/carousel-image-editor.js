import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageEditor } from './../../../components/image/components/image-editor';

export const CarouselImageEditor = ({ attributes, actions }) => {
	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass}>
			<ImageEditor
				{...attributes}
				{...actions}
			/>
		</div>
	);
};
