import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { ButtonEditor } from './components/button-editor';
import { ButtonOptions } from './components/button-options';

export const Button = (props) => {
	return (
		<>
			<InspectorControls>
				<ButtonOptions {...props} />
			</InspectorControls>
			<ButtonEditor {...props} />
		</>
	);
};
