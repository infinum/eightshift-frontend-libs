import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { CarouselImageEditor } from './components/carousel-image-editor';
import { CarouselImageToolbar } from './components/carousel-image-toolbar';

export const CarouselImage = (props) => {

	const {
		attributes,
	} = props;

	const actions = getActions(props, manifest);

	return (
		<Fragment>
			<BlockControls>
				<CarouselImageToolbar
					attributes={attributes}
					actions={actions}
				/>
			</BlockControls>
			<CarouselImageEditor
				attributes={attributes}
				actions={actions}
			/>
		</Fragment>
	);
};
