import React from 'react';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { LinkEditor } from './components/link-editor';
import { LinkToolbar } from './components/link-toolbar';
import { LinkOptions } from './components/link-options';

export const Link = (props) => {
	return (
		<>
			<InspectorControls>
				<LinkOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<LinkToolbar {...props} />
			</BlockControls>
			<LinkEditor {...props} />
		</>
	);
};
