import React from 'react';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { props } from '@eightshift/frontend-libs/scripts';
import { EmbedOptions as EmbedOptionsComponent } from '../../../components/embed/components/embed-options';

export const EmbedOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Embed', 'safer-internet')}>
			<EmbedOptionsComponent
				{...props('embed', attributes, {
					setAttributes: setAttributes,
				})}
			/>
		</PanelBody>
	);
};
