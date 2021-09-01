import React from 'react';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { BlockquoteEditor } from './components/blockquote-editor';
import { BlockquoteToolbar } from './components/blockquote-toolbar';
import { BlockquoteOptions } from './components/blockquote-options';

export const Blockquote = (props) => {
	return (
		<>
			<InspectorControls>
				<BlockquoteOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<BlockquoteToolbar {...props} />
			</BlockControls>
			<BlockquoteEditor {...props} />
		</>
	);
};
