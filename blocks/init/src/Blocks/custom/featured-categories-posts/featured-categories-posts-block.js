import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { FeaturedCategoriesPostsEditor } from './components/featured-categories-posts-editor';
import { FeaturedCategoriesPostsOptions } from './components/featured-categories-posts-options';

export const FeaturedCategoriesPosts = (props) => {
	return (
		<Fragment>
			<InspectorControls>
				<FeaturedCategoriesPostsOptions {...props} />
			</InspectorControls>
			<FeaturedCategoriesPostsEditor {...props} />
		</Fragment>
	);
};
