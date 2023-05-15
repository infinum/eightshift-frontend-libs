import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { SiteFooterEditor } from './components/site-footer-editor';
import { SiteFooterOptions } from './components/site-footer-options';

export const SiteFooter = (props) => {
	return (
		<>
			<InspectorControls>
				<SiteFooterOptions {...props} />
			</InspectorControls>

			<SiteFooterEditor {...props} />
		</>
	);
};
