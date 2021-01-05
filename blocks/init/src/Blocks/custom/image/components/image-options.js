import React from 'react';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ImageOptions as ImageOptionsComponent } from '../../../components/image/components/image-options';

export const ImageOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Image Details', 'eightshift-frontend-libs')}>
			<ImageOptionsComponent
				{...attributes}
				setAttributes={setAttributes}
			/>
		</PanelBody>
	);
};
