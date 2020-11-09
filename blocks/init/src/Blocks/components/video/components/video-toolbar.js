import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToolbarGroup } from '@wordpress/components';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { trash } from '@wordpress/icons';
import manifest from './../manifest.json';

const { attributes: defaults, options } = manifest;

export const VideoToolbar = (attributes) => {
	const {
		setAttributes,
		videoShowControls = true,

		videoUse = defaults.videoUse.default,

		videoUrl,
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
					{videoUrl &&
						<ToolbarGroup
							controls={[
								{
									icon: trash,
									title: __('Remove video', 'eightshift-boilerplate'),
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
