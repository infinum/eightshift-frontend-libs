import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { ImageEditor } from './components/image-editor';
import { ImageOptions } from './components/image-options';

export const Image = (props) => {
	return (
		<>
			<InspectorControls>
				<ImageOptions {...props} />
			</InspectorControls>
			<ImageEditor {...props} />
		</>
	);
};
