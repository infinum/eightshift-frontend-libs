import React from 'react';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ImageOptions as ImageOptionsComponent } from '../../../components/image/components/image-options';
import manifest from './../manifest.json';

export const ImageOptions = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
	} = manifest;

	return (
		<PanelBody title={__('Image Details', 'eightshift-frontend-libs')}>

			<ImageOptionsComponent
				{...props(attributes, manifestBlockName, '', true)}
				setAttributes={setAttributes}
			/>

		</PanelBody>
	);
};
