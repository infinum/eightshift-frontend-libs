import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToolbarGroup } from '@wordpress/components';

export const VideoToolbar = (props) => {
	const {
		video: {
			url,
			use = true,
		},
		showControls = true,
		onChangeVideo,
	} = props;

	const removeMedia = () => {
		onChangeVideo({});
	};

	if (!showControls) {
		return null;
	}

	return (
		<Fragment>
			{use &&
				<Fragment>
					{url &&
						<ToolbarGroup
							controls={[
								{
									icon: 'trash',
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
