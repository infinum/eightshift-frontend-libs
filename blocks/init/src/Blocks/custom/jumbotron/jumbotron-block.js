import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { JumbotronEditor } from './components/jumbotron-editor';
import { JumbotronOptions } from './components/jumbotron-options';

export const Jumbotron = (props) => {
	return (
		<>
			<InspectorControls>
				<JumbotronOptions {...props} />
			</InspectorControls>
			<JumbotronEditor {...props} />
		</>
	);
};
