import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { SiteNavigationEditor } from './components/site-navigation-editor';
import { SiteNavigationOptions } from './components/site-navigation-options';

export const SiteNavigation = (props) => {
	return (
		<>
			<InspectorControls>
				<SiteNavigationOptions {...props} />
			</InspectorControls>

			<SiteNavigationEditor {...props} />
		</>
	);
};
