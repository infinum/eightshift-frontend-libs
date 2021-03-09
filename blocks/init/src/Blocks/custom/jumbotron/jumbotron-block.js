import React from 'react';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { JumbotronEditor } from './components/jumbotron-editor';
import { JumbotronOptions } from './components/jumbotron-options';
import { JumbotronToolbar } from './components/jumbotron-toolbar';

export const Jumbotron = (props) => {
	return (
		<>
			<InspectorControls>
				<JumbotronOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<JumbotronToolbar {...props} />
			</BlockControls>
			<JumbotronEditor {...props} />
		</>
	);
};
