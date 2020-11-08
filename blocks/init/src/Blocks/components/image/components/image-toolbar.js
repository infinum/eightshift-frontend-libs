import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToolbarGroup } from '@wordpress/components';
import { AlignmentToolbar } from '@wordpress/block-editor';
import manifest from './../manifest.json';

const { attributes: defaults, options } = manifest;

export const ImageToolbar = (attributes) => {
	const {
		setAttributes,
		imageShowControls = true,

		imageUse = defaults.imageUse.default,

		imageUrl,
		imageAlign = defaults.imageAlign.default,

		showImageAlign = true,
	} = attributes;

	if (!imageShowControls) {
		return null;
	}

	const removeMedia = () => {
		setAttributes({ imageUrl: '' });
	};

	return (
		<Fragment>
			{imageUse &&
				<Fragment>
					{(imageUrl !== '') &&
						<ToolbarGroup
							controls={[
								{
									icon: 'trash',
									title: __('Remove image', 'solplanet'),
									isActive: false,
									onClick: removeMedia,
								},
							]}
						/>
					}

					{showImageAlign &&
						<AlignmentToolbar
							value={imageAlign}
							options={options.aligns}
							onChange={(value) => setAttributes({ imageAlign: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
