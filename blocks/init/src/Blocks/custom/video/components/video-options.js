import React from 'react';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { props, MatrixAlignControl, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import { VideoOptions as VideoOptionsComponent } from '../../../components/video/components/video-options';
import manifest from './../manifest.json';

export const VideoOptions = ({ attributes, setAttributes }) => {
	const videoAlign = checkAttr('videoAlign', attributes, manifest);

	return (
		<PanelBody title={__('Video', 'eightshift-frontend-libs')}>
			<VideoOptionsComponent
				{...props('video', attributes, {
					setAttributes,
				})}
				showVideoUse={false}
				showLabel={false}
				showExpanderButton={false}
				additionalControlsDesignLayout={
					<div className='es-v-center es-gap-1.25! es-rounded-1.0 es-border-cool-gray-100 es-w-17 es-h-17 es-text-3! es-line-h-1'>
						<div className='es-rounded-0.75 es-border-cool-gray-300 es-line-h-0'>
							<MatrixAlignControl
								label={__('Video position', 'eightshift-frontend-libs')}
								value={videoAlign}
								onChange={(value) => setAttributes({ [getAttrKey('videoAlign', attributes, manifest)]: value })}
							/>
						</div>
						<span>{__('Position', 'eightshift-frontend-libs')}</span>
					</div>
				}
			/>
		</PanelBody>
	);
};
