import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { URLInput } from '@wordpress/block-editor';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, TextControl, Icon, ToggleControl } from '@wordpress/components';
import { getPaletteColors, icons } from '@eightshift/frontend-libs/scripts/editor';

export const buttonSizes = [
	{ label: __('Default', 'eightshift-boilerplate'), value: 'default' },
	{ label: __('Big', 'eightshift-boilerplate'), value: 'big' },
];

export const buttonSizeWidths = [
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
			sizeWidth,
			id,
			isAnchor,
		},
		label,
		onChangeButtonUrl,
		onChangeButtonSize,
		onChangeButtonColor,
		onChangeButtonSizeWidth,
		onChangeButtonId,
		onChangeButtonIsAnchor,
	} = props;

	return (
		<Fragment>

			{label &&
				<h3>
					{label}
				</h3>
			}

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
					help={__('Change Background Color.', 'eightshift-boilerplate')}
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

			{onChangeButtonSizeWidth &&
				<SelectControl
					label={__('Size Width', 'eightshift-boilerplate')}
					value={sizeWidth}
					options={buttonSizeWidths}
					onChange={onChangeButtonSizeWidth}
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
	);
};
