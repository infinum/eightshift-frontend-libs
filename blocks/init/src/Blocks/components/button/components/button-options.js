import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { URLInput } from '@wordpress/block-editor';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, TextControl, Icon, ToggleControl } from '@wordpress/components';
import { getPaletteColors, icons } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';

const { attributes: defaults, options, title } = manifest;

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
		label = title,
		buttonShowControls = true,

		buttonUse = defaults.buttonUse.default,

		buttonUrl,
		buttonColor = defaults.buttonColor.default,
		buttonSize = defaults.buttonSize.default,
		buttonWidth = defaults.buttonWidth.default,
		buttonIsAnchor = defaults.buttonIsAnchor.default,
		buttonId,

		showButtonUrl = true,
		showButtonColor = true,
		showButtonSize = true,
		showButtonWidth = true,
		showButtonIsAnchor = true,
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
				label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
				checked={buttonUse}
				onChange={(value) => setAttributes({ buttonUse: value })}
			/>

			{buttonUse &&
				<Fragment>

					{showButtonUrl &&
						<URLInput
							label={__('Url', 'eightshift-boilerplate')}
							value={buttonUrl}
							autoFocus={false}
							onChange={(value) => setAttributes({ buttonUrl: value })}
						/>
					}

					{showButtonColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-boilerplate')}

								</Fragment>
							}
							value={buttonColor}
							colors={buttonColors()}
							onChange={(value) => setAttributes({ buttonColor: value })}
						/>
					}

					{showButtonSize &&
						<SelectControl
							label={__('Size', 'eightshift-boilerplate')}
							value={buttonSize}
							options={options.sizes}
							onChange={(value) => setAttributes({ buttonSize: value })}
						/>
					}

					{showButtonWidth &&
						<SelectControl
							label={__('Width', 'eightshift-boilerplate')}
							value={buttonWidth}
							options={options.widths}
							onChange={(value) => setAttributes({ buttonWidth: value })}
						/>
					}

					{showButtonIsAnchor &&
						<ToggleControl
							label={__('Anchor', 'eightshift-boilerplate')}
							checked={buttonIsAnchor}
							onChange={(value) => setAttributes({ buttonIsAnchor: value })}
							help={__('Using anchor option will add JavaScript selector to the button. You must provide anchor destination inside Button Url field. Example: #super-block.', 'eightshift-boilerplate')}
						/>
					}

					{showButtonId &&
						<TextControl
							label={__('ID', 'eightshift-boilerplate')}
							value={buttonId}
							onChange={(value) => setAttributes({ buttonId: value })}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
