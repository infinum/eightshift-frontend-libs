import React from 'react';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { ExampleEditor } from './components/example-editor';
import { ExampleOptions } from './components/example-options';
import { ExampleToolbar } from './components/example-toolbar';

export const Example = (props) => {
	return (
		<>
			<InspectorControls>
				<ExampleOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<ExampleToolbar {...props} />
			</BlockControls>
			<ExampleEditor {...props} />
		</>
	);
};
