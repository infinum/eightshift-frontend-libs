import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { FeaturedPostsEditor } from './components/featured-posts-editor';
import { FeaturedPostsOptions } from './components/featured-posts-options';

export const FeaturedPosts = (props) => {
	return (
		<>
			<InspectorControls>
				<FeaturedPostsOptions {...props} />
			</InspectorControls>
			<FeaturedPostsEditor {...props} />
		</>
	);
};
