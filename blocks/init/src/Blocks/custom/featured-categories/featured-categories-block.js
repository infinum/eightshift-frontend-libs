import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { FeaturedCategoriesEditor } from './components/featured-categories-editor';
import { FeaturedCategoriesOptions } from './components/featured-categories-options';

export const FeaturedCategories = (props) => {
	return (
		<>
			<InspectorControls>
				<FeaturedCategoriesOptions {...props} />
			</InspectorControls>
			<FeaturedCategoriesEditor {...props} />
		</>
	);
};
