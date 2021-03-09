import React from 'react';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { HeadingEditor } from './components/heading-editor';
import { HeadingToolbar } from './components/heading-toolbar';
import { HeadingOptions } from './components/heading-options';

export const Heading = (props) => {
	return (
		<>
			<InspectorControls>
				<HeadingOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<HeadingToolbar {...props} />
			</BlockControls>
			<HeadingEditor {...props} />
		</>
	);
};
