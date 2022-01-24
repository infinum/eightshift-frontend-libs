import React from 'react';
import _ from 'lodash';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { TextareaControl, BaseControl, Button } from '@wordpress/components';
import { Responsive, icons, ucfirst, checkAttr, checkAttrResponsive, getAttrKey, ComponentUseToggle, IconLabel, BlockIcon, IconToggle } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ImageOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		imageShowControls = true,

		showImageUse = false,
		showLabel = false,
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
			<ComponentUseToggle
				label={label}
				checked={imageUse}
				onChange={(value) => setAttributes({ [getAttrKey('imageUse', attributes, manifest)]: value })}
				showUseToggle={showImageUse}
				showLabel={showLabel}
			/>

			{imageUse &&
				<>
					{showImageUrl &&
						<Responsive label={<IconLabel icon={icons.image} label={__('Image source', 'eightshift-frontend-libs')} />}>
							{Object.keys(checkAttrResponsive('imageUrl', attributes, manifest)).map(function (keyName) {

								let point = ucfirst(keyName);
								let pointLabel = point;
								if (point === 'Large') {
									point = '';
									pointLabel = __('Default (all screens)', 'eightshift-frontend-libs');
								}

								const attr = getAttrKey(`imageUrl${point}`, attributes, manifest);

								const removeImageButton = (
									<>
										{attributes[attr]?.length > 0 &&
											<Button
												isSecondary
												isSmall
												isDestructive
												className='es-small-square-icon-button'
												onClick={() => setAttributes({ [attr]: {} })}
												icon={icons.trash}
											/>
										}
									</>
								);

								const showPlaceholder = _.isEmpty(attributes[attr]);

								return (
									<BaseControl
										key={keyName}
										label={
											<>
												<IconLabel icon={icons[`screen${point.length ? point : 'Large'}`]} label={pointLabel} />
												{removeImageButton}
											</>
										}
									>
										{showPlaceholder &&
											<MediaPlaceholder
												icon={<BlockIcon iconName='es-image' />}
												onSelect={(value) => setAttributes({ [attr]: value.url })}
												accept={imageAccept}
												allowedTypes={imageAllowedTypes}
											/>
										}
										{!showPlaceholder &&
											<img src={attributes[attr]} alt='' />
										}
									</BaseControl>
								);
							})}
						</Responsive>
					}

					{showImageAlt &&
						<TextareaControl
							label={<IconLabel icon={icons.altText} label={__('Alt text', 'eightshift-frontend-libs')} />}
							value={imageAlt}
							onChange={(value) => setAttributes({ [getAttrKey('imageAlt', attributes, manifest)]: value })}
						/>
					}

					{showImageFull &&
						<IconToggle
							icon={icons.size}
							label={__('Fill container', 'eightshift-frontend-libs')}
							help={__('Span the full width of the container and ignore its maximum width', 'eightshift-frontend-libs')}
							checked={imageFull}
							onChange={(value) => setAttributes({ [getAttrKey('imageFull', attributes, manifest)]: value })}
						/>
					}
				</>
			}

		</>
	);
};
