import React from 'react';
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { overrideInnerBlockAttributes } from '@eightshift/frontend-libs/scripts/editor';
import { InspectorControls } from '@wordpress/block-editor';
import { CarouselOptions } from './components/carousel-options';
import { CarouselEditor } from './components/carousel-editor';

export const Carousel = (props) => {
	const {
		clientId,
		attributes: {
			blockClass,
		},
	} = props;

	// Set this attributes to all inner blocks once inserted in DOM.
	useSelect((select) => {
		overrideInnerBlockAttributes(
			select,
			clientId,
			{
				wrapperDisable: true,
				wrapperParentClass: blockClass,
			}
		);
	});

	return (
		<Fragment>
			<InspectorControls>
				<CarouselOptions {...props} />
			</InspectorControls>
			<CarouselEditor {...props} />
		</Fragment>
	);
};
