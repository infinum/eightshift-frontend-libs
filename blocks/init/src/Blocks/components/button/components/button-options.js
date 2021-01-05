import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { URLInput } from '@wordpress/block-editor';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, TextControl, Icon, ToggleControl } from '@wordpress/components';
import { getPaletteColors, icons } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { options, title } = manifest;

export const buttonColors = () => {
	const colors = getPaletteColors();

	return [
		colors.primary,
		colors.black,
	];
};

export const ButtonOptions = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		buttonShowControls = true,

		buttonUse = checkAttr('buttonUse', attributes, manifest, componentName),

		buttonUrl = checkAttr('buttonUrl', attributes, manifest, componentName),
		buttonColor = checkAttr('buttonColor', attributes, manifest, componentName),
		buttonSize = checkAttr('buttonSize', attributes, manifest, componentName),
		buttonWidth = checkAttr('buttonWidth', attributes, manifest, componentName),
		buttonIsAnchor = checkAttr('buttonIsAnchor', attributes, manifest, componentName),
		buttonIsNewTab = checkAttr('buttonIsNewTab', attributes, manifest, componentName),
		buttonId = checkAttr('buttonId', attributes, manifest, componentName),

		showButtonUrl = true,
		showButtonColor = true,
		showButtonSize = true,
		showButtonWidth = true,
		showButtonIsAnchor = true,
		showButtonIsNewTab = true,
		showButtonId = true,
	} = attributes;

	if (!buttonShowControls) {
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
				checked={buttonUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{buttonUse &&
				<Fragment>

					{showButtonUrl &&
						<URLInput
							label={__('Url', 'eightshift-frontend-libs')}
							value={buttonUrl}
							autoFocus={false}
							onChange={(value) => setAttributes({ [`${componentName}Url`]: value })}
						/>
					}

					{showButtonColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-frontend-libs')}

								</Fragment>
							}
							value={buttonColor}
							colors={buttonColors()}
							onChange={(value) => setAttributes({ [`${componentName}Color`]: value })}
						/>
					}

					{showButtonSize &&
						<SelectControl
							label={__('Size', 'eightshift-frontend-libs')}
							value={buttonSize}
							options={options.sizes}
							onChange={(value) => setAttributes({ [`${componentName}Size`]: value })}
						/>
					}

					{showButtonWidth &&
						<SelectControl
							label={__('Width', 'eightshift-frontend-libs')}
							value={buttonWidth}
							options={options.widths}
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

					{showButtonIsNewTab &&
						<ToggleControl
							label={__('New Tab', 'eightshift-frontend-libs')}
							checked={buttonIsNewTab}
							onChange={(value) => setAttributes({ [`${componentName}IsNewTab`]: value })}
						/>
					}

					{showButtonId &&
						<TextControl
							label={__('ID', 'eightshift-frontend-libs')}
							value={buttonId}
							onChange={(value) => setAttributes({ [`${componentName}Id`]: value })}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
