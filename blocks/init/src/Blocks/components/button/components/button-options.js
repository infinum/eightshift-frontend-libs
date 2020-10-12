import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { URLInput } from '@wordpress/block-editor';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, TextControl, Icon, ToggleControl } from '@wordpress/components';
import { getPaletteColors, icons } from '@eightshift/frontend-libs/scripts/editor';

export const buttonSizes = [
	{ label: __('Default', 'eightshift-boilerplate'), value: 'default' },
	{ label: __('Big', 'eightshift-boilerplate'), value: 'big' },
];

export const buttonWidths = [
	{ label: __('Default', 'eightshift-boilerplate'), value: 'default' },
	{ label: __('Block', 'eightshift-boilerplate'), value: 'block' },
];

export const buttonColors = () => {
	const colors = getPaletteColors();

	return [
		colors.primary,
		colors.black,
	];
};

export const ButtonOptions = (props) => {
	const {
		button: {
			url,
			size,
			color,
			width,
			id,
			isAnchor,
			use = true,
		},
		showControls = true,
		label = __('Button', 'eightshift-boilerplate'),
		onChangeButtonUrl,
		onChangeButtonSize,
		onChangeButtonColor,
		onChangeButtonWidth,
		onChangeButtonId,
		onChangeButtonIsAnchor,
		onChangeButtonUse,
	} = props;

	if (!showControls) {
		return null;
	}

	return (
		<Fragment>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{onChangeButtonUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
					checked={use}
					onChange={onChangeButtonUse}
				/>
			}

			{use &&
				<Fragment>

					{onChangeButtonUrl &&
						<URLInput
							label={__('Url', 'eightshift-boilerplate')}
							value={url}
							autoFocus={false}
							onChange={onChangeButtonUrl}
						/>
					}

					{onChangeButtonColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-boilerplate')}

								</Fragment>
							}
							value={color}
							colors={buttonColors()}
							onChange={onChangeButtonColor}
						/>
					}

					{onChangeButtonSize &&
						<SelectControl
							label={__('Size', 'eightshift-boilerplate')}
							value={size}
							options={buttonSizes}
							onChange={onChangeButtonSize}
						/>
					}

					{onChangeButtonWidth &&
						<SelectControl
							label={__('Size Width', 'eightshift-boilerplate')}
							value={width}
							options={buttonWidths}
							onChange={onChangeButtonWidth}
						/>
					}

					{onChangeButtonIsAnchor &&
						<ToggleControl
							label={__('Anchor', 'eightshift-boilerplate')}
							checked={isAnchor}
							onChange={onChangeButtonIsAnchor}
							help={__('Using anchor option will add JavaScript selector to the button. You must provide anchor destination inside Button Url field. Example: #super-block.', 'eightshift-boilerplate')}
						/>
					}

					{onChangeButtonId &&
						<TextControl
							label={__('ID', 'eightshift-boilerplate')}
							value={id}
							onChange={onChangeButtonId}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
