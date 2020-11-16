import React from 'react'; // eslint-disable-line no-unused-vars
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { VideoOptions as VideoOptionsComponent } from '../../../components/video/components/video-options';

export const VideoOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Video Details', 'EightshiftBoilerplate')}>
			<VideoOptionsComponent
				{...attributes}
				setAttributes={setAttributes}
			/>
		</PanelBody>
	);
};
