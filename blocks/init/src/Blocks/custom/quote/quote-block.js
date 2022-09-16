import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { QuoteEditor } from './components/quote-editor';
import { QuoteOptions } from './components/quote-options';

export const Quote = (props) => {
	return (
		<>
			<InspectorControls>
				<QuoteOptions {...props} />
			</InspectorControls>
			<QuoteEditor {...props} />
		</>
	);
};
