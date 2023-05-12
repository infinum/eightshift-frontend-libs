import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { SocialNetworksEditor } from './components/social-networks-editor';
import { SocialNetworksOptions } from './components/social-networks-options';

export const SocialNetworks = (props) => {
	return (
		<>
			<InspectorControls>
				<SocialNetworksOptions {...props} />
			</InspectorControls>

			<SocialNetworksEditor {...props} />
		</>
	);
};
