import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { CardEditor } from './components/card-editor';
import { CardOptions } from './components/card-options';

export const Card = (props) => {
	return (
		<>
			<InspectorControls>
				<CardOptions {...props} />
			</InspectorControls>
			<CardEditor {...props} />
		</>
	);
};
