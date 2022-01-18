import React from 'react';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { props } from '@eightshift/frontend-libs/scripts';
import { ImageOptions as ImageOptionsComponent } from '../../../components/image/components/image-options';

export const ImageOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Image', 'eightshift-boilerplate')}>
			<ImageOptionsComponent
				{...props('image', attributes, {
					setAttributes,
				})}
			/>
		</PanelBody>
	);
};
