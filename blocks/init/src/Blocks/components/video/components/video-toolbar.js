import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToolbarGroup } from '@wordpress/components';
import { trash } from '@wordpress/icons';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const VideoToolbar = (attributes) => {
	const {
		setAttributes,
		videoShowControls = true,

		videoUse = checkAttr('videoUse', attributes, manifest),

		videoUrl = checkAttr('videoUrl', attributes, manifest),
	} = attributes;

	if (!videoShowControls) {
		return null;
	}

	const removeMedia = () => {
		setAttributes({ videoUrl: '' });
	};

	return (
		<Fragment>
			{videoUse &&
				<Fragment>
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

				</Fragment>
			}
		</Fragment>
	);
};
