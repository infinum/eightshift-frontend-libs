import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { CarouselOptions } from './components/carousel-options';
import { CarouselEditor } from './components/carousel-editor';

export const Carousel = (props) => {
	return (
		<>
			<InspectorControls>
				<CarouselOptions {...props} />
			</InspectorControls>
			<CarouselEditor {...props} />
		</>
	);
};
