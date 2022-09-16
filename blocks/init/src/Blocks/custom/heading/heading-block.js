import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { HeadingEditor } from './components/heading-editor';
import { HeadingOptions } from './components/heading-options';

export const Heading = (props) => {
	return (
		<>
			<InspectorControls>
				<HeadingOptions {...props} />
			</InspectorControls>
			<HeadingEditor {...props} />
		</>
	);
};
