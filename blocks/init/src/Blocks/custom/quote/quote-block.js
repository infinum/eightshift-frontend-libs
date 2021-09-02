import React from 'react';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { QuoteEditor } from './components/quote-editor';
import { QuoteToolbar } from './components/quote-toolbar';
import { QuoteOptions } from './components/quote-options';

export const Quote = (props) => {
	return (
		<>
			<InspectorControls>
				<QuoteOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<QuoteToolbar {...props} />
			</BlockControls>
			<QuoteEditor {...props} />
		</>
	);
};
