import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { CarouselItemEditor } from './components/carousel-item-editor';
import { CarouselItemOptions } from './components/carousel-item-options';

export const CarouselItem = (props) => {
	return (
		<>
			<InspectorControls>
				<CarouselItemOptions {...props} />
			</InspectorControls>
			<CarouselItemEditor {...props} />
		</>
	);
};
