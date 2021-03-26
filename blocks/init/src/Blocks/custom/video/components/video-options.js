import React from 'react';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { VideoOptions as VideoOptionsComponent } from '../../../components/video/components/video-options';
import manifest from './../manifest.json';

export const VideoOptions = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<PanelBody title={__('Video Details', 'eightshift-frontend-libs')}>
			<VideoOptionsComponent
				{...props(attributes, blockName, '', true)}
				setAttributes={setAttributes}
			/>
		</PanelBody>
	);
};
