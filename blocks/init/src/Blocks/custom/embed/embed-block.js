import React from 'react';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { EmbedEditor } from './components/embed-editor';
import { EmbedOptions } from './components/embed-options';
import { EmbedToolbar } from './components/embed-toolbar';

export const Embed = (props) => {
	return (
		<>
			<InspectorControls>
				<EmbedOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<EmbedToolbar {...props} />
			</BlockControls>
			<EmbedEditor {...props} />
		</>
	);
};
