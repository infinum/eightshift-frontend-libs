import React from 'react';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { ButtonEditor } from './components/button-editor';
import { ButtonToolbar } from './components/button-toolbar';
import { ButtonOptions } from './components/button-options';

export const Button = (props) => {
	return (
		<>
			<InspectorControls>
				<ButtonOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<ButtonToolbar {...props} />
			</BlockControls>
			<ButtonEditor {...props} />
		</>
	);
};
