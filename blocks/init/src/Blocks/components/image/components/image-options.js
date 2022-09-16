import React from 'react';
import _ from 'lodash';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { TextControl, Button, BaseControl } from '@wordpress/components';
import { icons, ucfirst, checkAttr, checkAttrResponsive, getAttrKey, IconLabel, IconToggle, CollapsableComponentUseToggle, CompactResponsive, getDefaultBreakpointNames, FancyDivider } from '@eightshift/frontend-libs/scripts';
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
		showLabel = true,
		showImageUrl = true,
		showImageAlt = true,
		showImageFull = true,
		showImageRoundedCorners = true,
		showExpanderButton = true,

		additionalControlsBeforeA11y,
		additionalControlsAfterA11y,
		additionalControlsDesignLayout,

		hasInsetLabel = false,
	} = attributes;

	if (!imageShowControls) {
		return null;
	}

	const imageUse = checkAttr('imageUse', attributes, manifest);
	const imageAlt = checkAttr('imageAlt', attributes, manifest);
	const imageAccept = checkAttr('imageAccept', attributes, manifest);
	const imageAllowedTypes = checkAttr('imageAllowedTypes', attributes, manifest);
	const imageFull = checkAttr('imageFull', attributes, manifest);
	const imageRoundedCorners = checkAttr('imageRoundedCorners', attributes, manifest);

	const urlAttrResponsiveValue = checkAttrResponsive(`imageUrl`, attributes, manifest);

	return (
		<CollapsableComponentUseToggle
			label={label}
			checked={imageUse}
			onChange={(value) => setAttributes({ [getAttrKey('imageUse', attributes, manifest)]: value })}
			showUseToggle={showImageUse}
			showLabel={showLabel}
			showExpanderButton={showExpanderButton}
			additionalClasses={hasInsetLabel ? 'has-inset-label' : ''}
		>
			{showImageUrl &&
				<CompactResponsive label={__('Image', 'eightshift-frontend-libs')} icon={icons.imageFile} additionalClasses='es-mb-0-important'>
					{getDefaultBreakpointNames().map((breakpointName) => {
						let point = ucfirst(breakpointName);

						if (breakpointName === 'large') {
							point = '';
						}

						const urlAttr = getAttrKey(`imageUrl${point}`, attributes, manifest);
						const idAttr = getAttrKey(`imageId${point}`, attributes, manifest);

						if (!_.isEmpty(urlAttrResponsiveValue[breakpointName])) {
							return (
								<div className='es-v-end es-image-preview' key={breakpointName}>
									<img src={urlAttrResponsiveValue[breakpointName]} alt='' />
									<Button
										onClick={() => setAttributes({
											[urlAttr]: undefined,
											[idAttr]: undefined,
										})}
										icon={icons.trash}
										className='es-button-icon-24 es-slight-button-border-cool-gray-300 es-rounded-1.0 es-nested-color-red-500'
									>
										{__('Remove', 'eightshift-frontend-libs')}
									</Button>
								</div>
							);
						}

						return (
							<MediaPlaceholder
								icon={icons.image}
								onSelect={(value) => setAttributes({
									[urlAttr]: value.url,
									[idAttr]: value.id,
								})}
								accept={imageAccept}
								allowedTypes={imageAllowedTypes}
								key={breakpointName}
							/>
						);
					})}
				</CompactResponsive>
			}


			{(showImageRoundedCorners || showImageFull || additionalControlsDesignLayout) &&
				<BaseControl label={<IconLabel icon={icons.design} label={__('Design & layout', 'eightshift-frontend-libs')} />}>
					<div className='es-h-spaced-wrap es-mb-4'>
						{showImageRoundedCorners &&
							<IconToggle
								icon={icons.roundedCorners}
								label={__('Rounded corners', 'eightshift-frontend-libs')}
								checked={imageRoundedCorners}
								onChange={(value) => setAttributes({ [getAttrKey('imageRoundedCorners', attributes, manifest)]: value })}
								type='tileButton'
							/>
						}

						{showImageFull &&
							<IconToggle
								icon={icons.expandXl}
								label={__('Fill container', 'eightshift-frontend-libs')}
								checked={imageFull}
								onChange={(value) => setAttributes({ [getAttrKey('imageFull', attributes, manifest)]: value })}
								type='tileButton'
							/>
						}

						{additionalControlsDesignLayout}
					</div>
				</BaseControl>
			}

			{additionalControlsBeforeA11y}

			{showImageAlt &&
				<FancyDivider label={<IconLabel icon={icons.a11y} label={__('Accessibility', 'eightshift-frontend-libs')} />} additionalClasses='es-mt-0 es-mb-2.5' />
			}

			{showImageAlt &&
				<TextControl
					label={<IconLabel icon={icons.altText} label={__('Alt text', 'eightshift-frontend-libs')} />}
					value={imageAlt}
					onChange={(value) => setAttributes({ [getAttrKey('imageAlt', attributes, manifest)]: value })}
					help={__('Describes the content of the image', 'eightshift-frontend-libs')}
				/>
			}

			{additionalControlsAfterA11y && <hr className='es-mt-0 es-mb-2.5' />}

			{additionalControlsAfterA11y}
		</CollapsableComponentUseToggle>
	);
};
