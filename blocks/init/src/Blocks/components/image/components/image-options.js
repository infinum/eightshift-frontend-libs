import React from 'react';
import _ from 'lodash';
import { __, sprintf } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { ToggleControl, Icon, TextareaControl, BaseControl, Button } from '@wordpress/components';
import { Responsive, icons, ucfirst, checkAttr, checkAttrResponsive, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ImageOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		imageShowControls = true,

		showImageUse = true,
		showImageUrl = true,
		showImageAlt = true,
		showImageFull = true,
	} = attributes;

	if (!imageShowControls) {
		return null;
	}

	const imageUse = checkAttr('imageUse', attributes, manifest);
	const imageAlt = checkAttr('imageAlt', attributes, manifest);
	const imageAccept = checkAttr('imageAccept', attributes, manifest);
	const imageAllowedTypes = checkAttr('imageAllowedTypes', attributes, manifest);
	const imageFull = checkAttr('imageFull', attributes, manifest);

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
					onChange={(value) => setAttributes({ [getAttrKey('imageUse', attributes, manifest)]: value })}
				/>
			}

			{imageUse &&
				<>
					{showImageUrl &&
						<Responsive
							label={
								<>
									<Icon icon={icons.link} />
									{__('Image Url', 'eightshift-frontend-libs')}
								</>
							}
						>
							{Object.keys(checkAttrResponsive('imageUrl', attributes, manifest)).map(function(keyName) {

								let point = ucfirst(keyName);
								let pointLabel = point;
								if (point === 'Large') {
									point = '';
									pointLabel = 'All';
								}

								const attr = getAttrKey(`imageUrl${point}`, attributes, manifest);

								return (
									<BaseControl
										key={keyName}
										label={sprintf(__('Image %s screen size', 'eightshift-frontend-libs'), pointLabel)}
									>
										{!_.isEmpty(attributes[attr]) ?
											<>
												<img src={attributes[attr]} alt='' />
												<Button
													isSecondary
													isSmall
													className={'custom-full-width-btn'}
													onClick={() => setAttributes({ [attr]: undefined })}
												>
													{sprintf(__('Remove %s screen size image', 'eightshift-frontend-libs'), pointLabel)}
												</Button>
											</> :
											<MediaPlaceholder
												icon="format-image"
												onSelect={(value) => setAttributes({[attr]: value.url})}
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
							label={__('Alt text', 'eightshift-frontend-libs')}
							value={imageAlt}
							onChange={(value) => setAttributes({ [getAttrKey('imageAlt', attributes, manifest)]: value })}
						/>
					}

					{showImageFull &&
						<ToggleControl
							label={__('Fill container', 'eightshift-frontend-libs')}
							help={__('If checked, the image will always stretch the full width of the container and ignore its maximum width.', 'eightshift-frontend-libs')}
							checked={imageFull}
							onChange={(value) => setAttributes({ [getAttrKey('imageFull', attributes, manifest)]: value })}
						/>
					}

				</>
			}

		</>
	);
};
