import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { ButtonEditor } from './components/button-editor';
import { ButtonToolbar } from './components/button-toolbar';
import { ButtonOptions } from './components/button-options';

export const Button = (props) => {
	return (
		<Fragment>
			<InspectorControls>
				<ButtonOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<ButtonToolbar {...props} />
			</BlockControls>
			<ButtonEditor {...props} />
		</Fragment>
	);
};
