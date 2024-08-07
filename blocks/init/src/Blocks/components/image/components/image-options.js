import React from 'react';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { TextControl, Button } from '@wordpress/components';
import {
	ucfirst,
	checkAttr,
	checkAttrResponsive,
	getAttrKey,
	IconLabel,
	IconToggle,
	UseToggle,
	Responsive,
	getDefaultBreakpointNames,
	Section,
	Control,
	generateUseToggleConfig,
} from '@eightshift/frontend-libs/scripts';
import { icons } from '@eightshift/ui-components/icons';
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
				<Control icon={icons.image} label={__('Image', '%g_textdomain%')} additionalLabelClasses='es-h-spaced' noBottomSpacing>
					<MediaPlaceholder
						labels={{
							title: __('Add an image', '%g_textdomain%'),
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
				<Responsive label={__('Image', '%g_textdomain%')} icon={icons.image}>
					{getDefaultBreakpointNames().map((breakpointName, index) => {
						let point = ucfirst(breakpointName);

						if (breakpointName === 'large') {
							point = '';
						}

						const urlAttr = getAttrKey(`imageUrl${point}`, attributes, manifest);
						const idAttr = getAttrKey(`imageId${point}`, attributes, manifest);

						if (!imageUrl[breakpointName]?.length) {
							return (
								<MediaPlaceholder
									key={breakpointName}
									labels={{
										title: __('Add an image', '%g_textdomain%'),
										instructions: __('Upload an image or choose one from the Media library'),
									}}
									icon={icons.plusCircleFillAlt}
									accept={imageAccept}
									allowedTypes={imageAllowedTypes}
									onSelect={({ url, id }) => {
										return setAttributes({
											[urlAttr]: url,
											[idAttr]: id,
										});
									}}
								/>
							);
						}

						return (
							<div className='es-h-center es-items-end! es-gap-0!' key={breakpointName}>
								<img
									alt={imageAlt}
									src={imageUrl[breakpointName]}
									className='es-h-26! es-min-w-26 es-max-w-48! es-w-auto es-border-cool-gray-100 es-rounded-2 es-object-scale-down'
								/>

								<Button
									key={index}
									icon={icons.trashAlt}
									label={__('Remove image', '%g_textdomain%')}
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
				showIf={!hideRoundedCornersToggle || !hideFullSizeToggle || typeof additionalControlsDesignLayout !== 'undefined'}
				icon={icons.design}
				label={__('Design & layout', '%g_textdomain%')}
				additionalClasses='es-h-spaced-wrap'
			>
				{!hideRoundedCornersToggle &&
					<IconToggle
						icon={icons.roundedCorners}
						label={__('Rounded corners', '%g_textdomain%')}
						checked={imageRoundedCorners}
						onChange={(value) => setAttributes({ [getAttrKey('imageRoundedCorners', attributes, manifest)]: value })}
						type='tileButton'
					/>
				}

				{!hideFullSizeToggle &&
					<IconToggle
						icon={icons.expandXl}
						label={__('Fill container', '%g_textdomain%')}
						checked={imageFull}
						onChange={(value) => setAttributes({ [getAttrKey('imageFull', attributes, manifest)]: value })}
						type='tileButton'
					/>
				}

				{additionalControlsDesignLayout}
			</Section>

			{additionalControlsBeforeA11y}

			<Section
				showIf={!hideAltText}
				icon={icons.a11y}
				label={__('Accessibility', '%g_textdomain%')}
				noBottomSpacing={!additionalControlsAfterA11y}
			>
				<TextControl
					label={<IconLabel icon={icons.altText} label={__('Alt text', '%g_textdomain%')} />}
					value={imageAlt}
					onChange={(value) => setAttributes({ [getAttrKey('imageAlt', attributes, manifest)]: value })}
					help={__('Describes the content of the image', '%g_textdomain%')}
					className='es-mb-0-bcf! es-mb-0!'
				/>
			</Section>

			{additionalControlsAfterA11y && <hr className='es-mt-0 es-mb-2.5' />}

			{additionalControlsAfterA11y}
		</UseToggle>
	);
};
