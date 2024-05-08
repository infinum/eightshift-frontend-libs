import React from 'react';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { props, MatrixAlignControl, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import { VideoOptions as VideoOptionsComponent } from '../../../components/video/components/video-options';
import manifest from './../manifest.json';

export const VideoOptions = ({ attributes, setAttributes }) => {
	const videoAlign = checkAttr('videoAlign', attributes, manifest);

	return (
		<PanelBody title={__('Video', '%g_textdomain%')}>
			<VideoOptionsComponent
				{...props('video', attributes, { setAttributes })}
				additionalControlsDesignLayout={
					<MatrixAlignControl
						label={__('Position', '%g_textdomain%')}
						value={videoAlign}
						onChange={(value) => setAttributes({ [getAttrKey('videoAlign', attributes, manifest)]: value })}
						type='tileButton'
					/>
				}
				noLabel
				noUseToggle
				noExpandButton
			/>
		</PanelBody>
	);
};
