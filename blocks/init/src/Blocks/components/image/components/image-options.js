import React from 'react';
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { ToggleControl, Icon, TextareaControl } from '@wordpress/components';
import { MediaPlaceholder, URLInput } from '@wordpress/block-editor';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
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
		imageAlt = checkAttr('imageAlt', attributes, manifest, componentName),
		imageLink = checkAttr('imageLink', attributes, manifest, componentName),
		imageAccept = checkAttr('imageAccept', attributes, manifest, componentName),
		imageAllowedTypes = checkAttr('imageAllowedTypes', attributes, manifest, componentName),
		imageBg = checkAttr('imageBg', attributes, manifest, componentName),
		imageUsePlaceholder = checkAttr('imageUsePlaceholder', attributes, manifest, componentName),

		showImageUrl = true,
		showImageAlt = true,
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
								setAttributes({
									[`${componentName}Url`]: value.url,
									[`${componentName}Alt`]: value.alt
								});
							}}
							accept={imageAccept}
							allowedTypes={imageAllowedTypes}
						/>
					}

					<br />

					{showImageAlt &&
						<TextareaControl
							label={__('Image alt tag', 'eightshift-frontend-libs')}
							value={imageAlt}
							onChange={(value) => setAttributes({ [`${componentName}Alt`]: value })}
						/>
					}

					{showImageBg &&
						<ToggleControl
							label={__('Use as a background image', 'eightshift-frontend-libs')}
							checked={imageBg}
							onChange={(value) => setAttributes({ [`${componentName}Bg`]: value })}
						/>
					}

					{showImageLink &&
						<URLInput
							label={
								<Fragment>
									<Icon icon={icons.link} />
									{__('URL', 'eightshift-frontend-libs')}
								</Fragment>
							}
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
