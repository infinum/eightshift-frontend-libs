import React from 'react';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { TextControl, Button } from '@wordpress/components';
import { icons, ucfirst, checkAttr, checkAttrResponsive, getAttrKey, IconLabel, IconToggle, UseToggle, Responsive, getDefaultBreakpointNames, Section, Control, generateUseToggleConfig } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ImageOptions = (attributes) => {
	const {
		setAttributes,

		hideImagePicker = false,
		hideAltText = false,
		hideFullSizeToggle = false,
		hideRoundedCornersToggle = false,

		additionalControlsBeforeA11y,
		additionalControlsAfterA11y,
		additionalControlsDesignLayout,
	} = attributes;

	const imageAlt = checkAttr('imageAlt', attributes, manifest);
	const imageAccept = checkAttr('imageAccept', attributes, manifest);
	const imageAllowedTypes = checkAttr('imageAllowedTypes', attributes, manifest);
	const imageFull = checkAttr('imageFull', attributes, manifest);
	const imageRoundedCorners = checkAttr('imageRoundedCorners', attributes, manifest);

	const imageUrl = checkAttrResponsive(`imageUrl`, attributes, manifest);
	const breakpoints = getDefaultBreakpointNames();

	if (!hideImagePicker && !imageUrl[breakpoints[0]]) {
		return (
			<UseToggle {...generateUseToggleConfig(attributes, manifest, 'imageUse')}>
				<Control icon={icons.image} label={__('Image', 'eightshift-frontend-libs')} additionalLabelClasses='es-h-spaced' noBottomSpacing>
					<MediaPlaceholder
						labels={{
							title: __('Add an image', 'eightshift-frontend-libs'),
							instructions: __('Upload an image or choose one from the Media library'),
						}}
						icon={icons.plusCircleFillAlt}
						accept={imageAccept}
						allowedTypes={imageAllowedTypes}
						onSelect={({ url, id }) => {
							return setAttributes({
								[getAttrKey('imageUrl', attributes, manifest)]: url,
								[getAttrKey('imageId', attributes, manifest)]: id,
							});
						}}
					/>
				</Control>
			</UseToggle>
		);
	}

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'imageUse')}>
			{!hideImagePicker &&
				<Responsive label={__('Image', 'eightshift-frontend-libs')} icon={icons.image}>
					{getDefaultBreakpointNames().map((breakpointName, index) => {
						let point = ucfirst(breakpointName);

						if (breakpointName === 'large') {
							point = '';
						}

						const urlAttr = getAttrKey(`imageUrl${point}`, attributes, manifest);
						const idAttr = getAttrKey(`imageId${point}`, attributes, manifest);

						return (
							<div className='es-h-center es-items-end! es-gap-0!' key={breakpointName}>
								<img
									alt={imageAlt}
									src={imageUrl[breakpointName]}
									className='es-h-26! es-min-w-26 es-w-auto es-border-cool-gray-100 es-rounded-2'
								/>

								<Button
									key={index}
									icon={icons.trashAlt}
									label={__('Remove image', 'eightshift-frontend-libs')}
									className='es-button-square-36 es-button-icon-26 es-border-cool-gray-100 es-hover-border-cool-gray-200 es-hover-color-red-500 es-rounded-1 es-nested-color-red-500 es-bg-pure-white es-shadow-sm es-hover-shadow-md -es-ml-4 -es-mb-2 es-has-animated-icon'
									onClick={() => setAttributes({
										[urlAttr]: undefined,
										[idAttr]: undefined,
									})}
									showTooltip
								/>
							</div>
						);
					})}
				</Responsive>
			}

			<Section
				showIf={!hideRoundedCornersToggle || !hideFullSizeToggle || !additionalControlsDesignLayout}
				icon={icons.design}
				label={__('Design & layout', 'eightshift-frontend-libs')}
				additionalClasses='es-h-spaced-wrap'
			>
				{!hideRoundedCornersToggle &&
					<IconToggle
						icon={icons.roundedCorners}
						label={__('Rounded corners', 'eightshift-frontend-libs')}
						checked={imageRoundedCorners}
						onChange={(value) => setAttributes({ [getAttrKey('imageRoundedCorners', attributes, manifest)]: value })}
						type='tileButton'
					/>
				}

				{!hideFullSizeToggle &&
					<IconToggle
						icon={icons.expandXl}
						label={__('Fill container', 'eightshift-frontend-libs')}
						checked={imageFull}
						onChange={(value) => setAttributes({ [getAttrKey('imageFull', attributes, manifest)]: value })}
						type='tileButton'
					/>
				}

				{additionalControlsDesignLayout}
			</Section>

			{additionalControlsBeforeA11y}

			<Section showIf={!hideAltText} icon={icons.a11y} label={__('Accessibility', 'eightshift-frontend-libs')} noBottomSpacing={!additionalControlsAfterA11y}>
				<TextControl
					label={<IconLabel icon={icons.altText} label={__('Alt text', 'eightshift-frontend-libs')} />}
					value={imageAlt}
					onChange={(value) => setAttributes({ [getAttrKey('imageAlt', attributes, manifest)]: value })}
					help={__('Describes the content of the image', 'eightshift-frontend-libs')}
					className='es-mb-0-bcf! es-mb-0!'
				/>
			</Section>

			{additionalControlsAfterA11y && <hr className='es-mt-0 es-mb-2.5' />}

			{additionalControlsAfterA11y}
		</UseToggle>
	);
};
