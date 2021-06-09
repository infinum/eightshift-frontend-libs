import React from 'react';
import { __ } from '@wordpress/i18n';
import { ToolbarGroup } from '@wordpress/components';
import { trash } from '@wordpress/icons';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const VideoToolbar = (attributes) => {
	const {
		componentName: manifestComponentName,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		videoShowControls = true,
	} = attributes;

	if (!videoShowControls) {
		return null;
	}

	const videoUse = checkAttr('videoUse', attributes, manifest);
	const videoUrl = checkAttr('videoUrl', attributes, manifest);

	const removeMedia = () => {
		setAttributes({ [`${componentName}Url`]: undefined });
	};

	return (
		<>
			{videoUse &&
				<>
					{(videoUrl !== '') &&
						<ToolbarGroup
							controls={[
								{
									icon: trash,
									title: __('Remove video', 'eightshift-frontend-libs'),
									isActive: false,
									onClick: removeMedia,
								},
							]}
						/>
					}

				</>
			}
		</>
	);
};
