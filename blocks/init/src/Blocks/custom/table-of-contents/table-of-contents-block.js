import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { TableOfContentsEditor } from './components/table-of-contents-editor';
import { TableOfContentsOptions } from './components/table-of-contents-options';

export const TableOfContents = (props) => {
	return (
		<>
			<InspectorControls>
				<TableOfContentsOptions {...props} />
			</InspectorControls>

			<TableOfContentsEditor {...props} />
		</>
	);
};
