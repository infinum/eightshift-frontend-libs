import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { ParagraphEditor } from './components/paragraph-editor';
import { ParagraphOptions } from './components/paragraph-options';

export const Paragraph = (props) => {
	return (
		<>
			<InspectorControls>
				<ParagraphOptions {...props} />
			</InspectorControls>
			<ParagraphEditor {...props} />
		</>
	);
};
