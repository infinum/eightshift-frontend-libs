import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { EmbedEditor } from './components/embed-editor';
import { EmbedOptions } from './components/embed-options';

export const Embed = (props) => {
	return (
		<>
			<InspectorControls>
				<EmbedOptions {...props} />
			</InspectorControls>
			<EmbedEditor {...props} />
		</>
	);
};
