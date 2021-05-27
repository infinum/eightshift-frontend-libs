import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, TextControl, Icon, ToggleControl } from '@wordpress/components';
import { icons, getOptionColors, getOptions } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ButtonOptions = (attributes) => {
	const {
		title: manifestTitle,
		componentName: manifestComponentName,
		options: manifestOptions,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = manifestTitle,
		buttonShowControls = true,

		showButtonUse = true,
		showButtonColor = true,
		showButtonSize = true,
		showButtonWidth = true,
		showButtonIsAnchor = true,
		showButtonId = true,
		showButtonIsLink = true,
	} = attributes;

	const options = {...manifestOptions, ...attributes.options};

	if (!buttonShowControls) {
		return null;
	}

	const buttonUse = checkAttr('buttonUse', attributes, manifest);
	const buttonColor = checkAttr('buttonColor', attributes, manifest);
	const buttonSize = checkAttr('buttonSize', attributes, manifest);
	const buttonWidth = checkAttr('buttonWidth', attributes, manifest);
	const buttonIsAnchor = checkAttr('buttonIsAnchor', attributes, manifest);
	const buttonId = checkAttr('buttonId', attributes, manifest);
	const buttonIsLink = checkAttr('buttonIsLink', attributes, manifest);

	return (
		<>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{showButtonUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
					checked={buttonUse}
					onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
				/>
			}

			{buttonUse &&
				<>
					{showButtonColor &&
						<ColorPaletteCustom
							label={
								<>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-frontend-libs')}
								</>
							}
							value={buttonColor}
							colors={getOptionColors(getOptions(manifest, componentName, 'color', options))}
							onChange={(value) => setAttributes({ [`${componentName}Color`]: value })}
						/>
					}

					{showButtonIsLink &&
						<ToggleControl
							label={__('Show button as link', 'eightshift-frontend-libs')}
							checked={buttonIsLink}
							onChange={(value) => setAttributes({ [`${componentName}IsLink`]: value })}
							help={__('When checked button will be converted to link style.', 'eightshift-frontend-libs')}
						/>
					}

					{showButtonSize &&
						<SelectControl
							label={
								<>
									<Icon icon={icons.size} />
									{__('Size', 'eightshift-frontend-libs')}
								</>
							}
							value={buttonSize}
							options={getOptions(manifest, componentName, 'size', options)}
							onChange={(value) => setAttributes({ [`${componentName}Size`]: value })}
						/>
					}

					{(showButtonWidth && !buttonIsLink) &&
						<SelectControl
							label={
								<>
									<Icon icon={icons.width} />
									{__('Width', 'eightshift-frontend-libs')}
								</>
							}
							value={buttonWidth}
							options={getOptions(manifest, componentName, 'width', options)}
							onChange={(value) => setAttributes({ [`${componentName}Width`]: value })}
						/>
					}

					{showButtonIsAnchor &&
						<ToggleControl
							label={__('Anchor', 'eightshift-frontend-libs')}
							checked={buttonIsAnchor}
							onChange={(value) => setAttributes({ [`${componentName}IsAnchor`]: value })}
							help={__('Using anchor option will add JavaScript selector to the button. You must provide anchor destination inside Button Url field. Example: #super-block.', 'eightshift-frontend-libs')}
						/>
					}

					{showButtonId &&
						<TextControl
							label={
								<>
									<Icon icon={icons.id} />
									{__('ID', 'eightshift-frontend-libs')}
								</>
							}
							value={buttonId}
							onChange={(value) => setAttributes({ [`${componentName}Id`]: value })}
						/>
					}
				</>
			}

		</>
	);
};
