import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

export const ImageOptions = (props) => {
	const {
		media: {
			url,
			accept = 'image/*',
			allowedTypes = ['image'],
			use = true,
		},
		showControls = true,
		label = __('Image', 'eightshift-boilerplate'),
		onChangeMedia,
		onChangeImageUse,
	} = props;

	if (!showControls) {
		return null;
	}

	return (
		<Fragment>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{onChangeImageUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
					checked={use}
					onChange={onChangeImageUse}
				/>
			}

			{use &&
				<Fragment>
					{onChangeMedia && !url &&
						<MediaPlaceholder
							icon="format-image"
							onSelect={onChangeMedia}
							accept={accept}
							allowedTypes={allowedTypes}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
