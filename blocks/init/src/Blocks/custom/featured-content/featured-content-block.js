import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { FeaturedContentEditor } from './components/featured-content-editor';
import { FeaturedContentOptions } from './components/featured-content-options';

export const FeaturedContent = (props) => {
	return (
		<>
			<InspectorControls>
				<FeaturedContentOptions {...props} />
			</InspectorControls>
			<FeaturedContentEditor {...props} />
		</>
	);
};
