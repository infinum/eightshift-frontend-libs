import React from 'react';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { props } from '@eightshift/frontend-libs/scripts';
import { VideoOptions as VideoOptionsComponent } from '../../../components/video/components/video-options';

export const VideoOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Video', 'eightshift-frontend-libs')}>
			<VideoOptionsComponent
				{...props('video', attributes, {
					setAttributes: setAttributes,
				})}
			/>
		</PanelBody>
	);
};
