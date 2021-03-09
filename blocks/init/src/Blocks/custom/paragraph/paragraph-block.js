import React from 'react';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { ParagraphEditor } from './components/paragraph-editor';
import { ParagraphToolbar } from './components/paragraph-toolbar';
import { ParagraphOptions } from './components/paragraph-options';

export const Paragraph = (props) => {
	return (
		<>
			<InspectorControls>
				<ParagraphOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<ParagraphToolbar {...props} />
			</BlockControls>
			<ParagraphEditor {...props} />
		</>
	);
};
