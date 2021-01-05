import React from 'react';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { ExampleEditor } from './components/example-editor';
import { ExampleOptions } from './components/example-options';
import { ExampleToolbar } from './components/example-toolbar';

export const Example = (props) => {
	return (
		<Fragment>
			<InspectorControls>
				<ExampleOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<ExampleToolbar {...props} />
			</BlockControls>
			<ExampleEditor {...props} />
		</Fragment>
	);
};
