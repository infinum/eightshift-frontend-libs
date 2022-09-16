import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { ListsEditor } from './components/lists-editor';
import { ListsOptions } from './components/lists-options';

export const Lists = (props) => {
	return (
		<>
			<InspectorControls>
				<ListsOptions {...props} />
			</InspectorControls>
			<ListsEditor {...props} />
		</>
	);
};
