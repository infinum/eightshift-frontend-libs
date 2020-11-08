import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { MediaPlaceholder, URLInput } from '@wordpress/block-editor';
import manifest from './../manifest.json';

const { attributes: defaults, title } = manifest;

export const ImageOptions = (attributes) => {
	const {
		setAttributes,
		label = title,
		imageShowControls = true,

		imageUse = defaults.imageUse.default,

		imageUrl,
		imageSize = defaults.imageSize.default,
		imageLink,
		imageAccept = defaults.imageAccept.default,
		imageAllowedTypes = defaults.imageAllowedTypes.default,
		imageBg = defaults.imageBg.default,

		showImageUrl = true,
		showImageSize = true,
		showImageLink = true,
		showImageBg = true,
	} = attributes;

	if (!imageShowControls) {
		return null;
	}

	return (
		<Fragment>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			<ToggleControl
				label={sprintf(__('Use %s', 'solplanet'), label)}
				checked={imageUse}
				onChange={(value) => setAttributes({ imageUse: value })}
			/>

			{imageUse &&
				<Fragment>
					{(showImageUrl && imageUrl === '' && imageBg) &&
						<MediaPlaceholder
							icon="format-image"
							onSelect={(value) => {
								setAttributes({ imageUrl: value.url });
							}}
							accept={imageAccept}
							allowedTypes={imageAllowedTypes}
						/>
					}

					<br />

					{showImageBg &&
						<ToggleControl
							label={__('Use as Background Image', 'solplanet')}
							checked={imageBg}
							onChange={(value) => setAttributes({ imageBg: value })}
						/>
					}

					{showImageLink &&
						<URLInput
							label={__('Url', 'eightshift-boilerplate')}
							value={imageLink}
							autoFocus={false}
							onChange={(value) => setAttributes({ imageLink: value })}
						/>
					}

				</Fragment>
			}

		</Fragment>
	);
};
