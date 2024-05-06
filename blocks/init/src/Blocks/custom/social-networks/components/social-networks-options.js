import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts';
import { SocialNetworksOptions as OptionsComponent } from '../../../components/social-networks/components/social-networks-options';

export const SocialNetworksOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Social networks', '%g_textdomain%')}>
			<OptionsComponent
				{...props('socialNetworks', attributes, { setAttributes })}
				noExpandButton
				noUseToggle
				noLabel
			/>
		</PanelBody>
	);
};
