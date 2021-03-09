import React from 'react';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { CardEditor } from './components/card-editor';
import { CardToolbar } from './components/card-toolbar';
import { CardOptions } from './components/card-options';

export const Card = (props) => {
	return (
		<>
			<InspectorControls>
				<CardOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<CardToolbar {...props} />
			</BlockControls>
			<CardEditor {...props} />
		</>
	);
};
