import React from 'react';
import _ from 'lodash';
import { __, sprintf } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { ToggleControl, Icon, TextareaControl, BaseControl, Button } from '@wordpress/components';
import { icons, ucfirst } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { Responsive } from '@eightshift/frontend-libs/scripts/components';
import manifest from './../manifest.json';

export const ImageOptions = (attributes) => {
	const {
		title: manifestTitle,
		breakpoints: manifestBreakpoints,
		componentName: manifestComponentName,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = manifestTitle,
		imageShowControls = true,

		imageUse = checkAttr('imageUse', attributes, manifest, componentName),

		imageAlt = checkAttr('imageAlt', attributes, manifest, componentName),
		imageAccept = checkAttr('imageAccept', attributes, manifest, componentName),
		imageAllowedTypes = checkAttr('imageAllowedTypes', attributes, manifest, componentName),
		imageFull = checkAttr('imageFull', attributes, manifest, componentName),

		showImageUse = true,
		showImageUrl = true,
		showImageAlt = true,
		showImageFull = true,
	} = attributes;

	const imageUrl = {
		default: checkAttr('imageUrl', attributes, manifest, componentName),
		desktop: checkAttr('imageUrlDesktop', attributes, manifest, componentName),
		tablet: checkAttr('imageUrlTablet', attributes, manifest, componentName),
		mobile: checkAttr('imageUrlMobile', attributes, manifest, componentName),
	};

	if (!imageShowControls) {
		return null;
	}

	return (
		<>
			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{showImageUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
					checked={imageUse}
					onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
				/>
			}

			{imageUse &&
				<>
					{showImageUrl &&
						<Responsive
							label={
								<>
									<Icon icon={icons.link} />
									{__('Image', 'eightshift-frontend-libs')}
								</>
							}
						>
							{Object.keys(imageUrl).map(function(keyName) {

								let point = ucfirst(manifestBreakpoints.filter((item) => item === keyName)[0]);
								let pointLabel = point;
								if (point==='Default') {
									point = '';
									pointLabel = 'All';
								}

								const attr = `${componentName}Url${point}`;

								return (
									<BaseControl
										key={keyName}
										label={sprintf(__('Image %s screen size', 'eightshift-frontend-libs'), pointLabel)}
									>
										{!_.isEmpty(attributes[attr]) ?
											<>
												<img src={attributes[attr].url} alt='' />
												<Button
													isSecondary
													isSmall
													className={'custom-full-width-btn'}
													onClick={() => setAttributes({ [attr]: {} })}
												>
													{sprintf(__('Remove %s screen size image', 'eightshift-frontend-libs'), pointLabel)}
												</Button>
											</> :
											<MediaPlaceholder
												icon="format-image"
												onSelect={(value) => setAttributes({
													[attr]: {
														id: value.id,
														url: value.url,
													}
												})}
												accept={imageAccept}
												allowedTypes={imageAllowedTypes}
											/>
										}
									</BaseControl>
								);
							})}
						</Responsive>
					}

					<br />

					{showImageAlt &&
						<TextareaControl
							label={__('Alt tag', 'eightshift-frontend-libs')}
							value={imageAlt}
							onChange={(value) => setAttributes({ [`${componentName}Alt`]: value })}
						/>
					}

					{showImageFull &&
						<ToggleControl
							label={__('Show full image', 'eightshift-frontend-libs')}
							help={__('If checked the image will always stretch the full width of the container and ignore it\'s max width.', 'eightshift-frontend-libs')}
							checked={imageFull}
							onChange={(value) => setAttributes({ [`${componentName}Full`]: value })}
						/>
					}

				</>
			}

		</>
	);
};
