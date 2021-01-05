import React from 'react';
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { MediaPlaceholder, URLInput } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { title } = manifest;

export const ImageOptions = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		imageShowControls = true,

		imageUse = checkAttr('imageUse', attributes, manifest, componentName),

		imageUrl = checkAttr('imageUrl', attributes, manifest, componentName),
		imageLink = checkAttr('imageLink', attributes, manifest, componentName),
		imageAccept = checkAttr('imageAccept', attributes, manifest, componentName),
		imageAllowedTypes = checkAttr('imageAllowedTypes', attributes, manifest, componentName),
		imageBg = checkAttr('imageBg', attributes, manifest, componentName),
		imageUsePlaceholder = checkAttr('imageUsePlaceholder', attributes, manifest, componentName),

		showImageUrl = true,
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
				label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
				checked={imageUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{imageUse &&
				<Fragment>
					{(showImageUrl && imageUsePlaceholder && imageUrl === '') &&
						<MediaPlaceholder
							icon="format-image"
							onSelect={(value) => {
								setAttributes({ [`${componentName}Url`]: value.url });
							}}
							accept={imageAccept}
							allowedTypes={imageAllowedTypes}
						/>
					}

					<br />

					{showImageBg &&
						<ToggleControl
							label={__('Use as Background Image', 'eightshift-frontend-libs')}
							checked={imageBg}
							onChange={(value) => setAttributes({ [`${componentName}Bg`]: value })}
						/>
					}

					{showImageLink &&
						<URLInput
							label={__('Url', 'eightshift-frontend-libs')}
							value={imageLink}
							autoFocus={false}
							onChange={(value) => setAttributes({ [`${componentName}Link`]: value })}
						/>
					}

				</Fragment>
			}

		</Fragment>
	);
};
