import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { SelectControl, TextControl, Icon, ToggleControl } from '@wordpress/components';
import { ColorPaletteCustom, icons, getOption, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ButtonOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
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
					onChange={(value) => setAttributes({ [getAttrKey('buttonUse', attributes, manifest)]: value })}
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
							colors={getOption('buttonColor', attributes, manifest, true)}
							onChange={(value) => setAttributes({ [getAttrKey('buttonColor', attributes, manifest)]: value })}
						/>
					}

					{showButtonIsLink &&
						<ToggleControl
							label={__('Show button as link', 'eightshift-frontend-libs')}
							checked={buttonIsLink}
							onChange={(value) => setAttributes({ [getAttrKey('buttonIsLink', attributes, manifest)]: value })}
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
							options={getOption('buttonSize', attributes, manifest)}
							onChange={(value) => setAttributes({ [getAttrKey('buttonSize', attributes, manifest)]: value })}
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
							options={getOption('buttonWidth', attributes, manifest)}
							onChange={(value) => setAttributes({ [getAttrKey('buttonWidth', attributes, manifest)]: value })}
						/>
					}

					{showButtonIsAnchor &&
						<ToggleControl
							label={__('Anchor', 'eightshift-frontend-libs')}
							checked={buttonIsAnchor}
							onChange={(value) => setAttributes({ [getAttrKey('buttonIsAnchor', attributes, manifest)]: value })}
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
							onChange={(value) => setAttributes({ [getAttrKey('buttonId', attributes, manifest)]: value })}
						/>
					}
				</>
			}

		</>
	);
};
