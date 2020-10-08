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
			styleSize,
			styleColor,
			styleSizeWidth,
			id,
			isAnchor,
		},
		onChangeButtonUrl,
		onChangeButtonStyleSize,
		onChangeButtonStyleColor,
		onChangeButtonStyleSizeWidth,
		onChangeButtonId,
		onChangeButtonIsAnchor,
	} = props;

	return (
		<Fragment>

			{onChangeButtonUrl &&
				<URLInput
					label={__('Button Url', 'eightshift-boilerplate')}
					value={url}
					onChange={onChangeButtonUrl}
				/>
			}

			{onChangeButtonStyleColor &&
				<ColorPaletteCustom
					label={
						<Fragment>
							<Icon icon={icons.color} />
							{__('Button Color', 'eightshift-boilerplate')}
						</Fragment>
					}
					help={__('Change Button Background color.', 'eightshift-boilerplate')}
					value={styleColor}
					colors={buttonColors()}
					onChange={onChangeButtonStyleColor}
				/>
			}

			{onChangeButtonStyleSize &&
				<SelectControl
					label={__('Button Size', 'eightshift-boilerplate')}
					value={styleSize}
					options={buttonSizes}
					onChange={onChangeButtonStyleSize}
				/>
			}

			{onChangeButtonStyleSizeWidth &&
				<SelectControl
					label={__('Button Size Width', 'eightshift-boilerplate')}
					value={styleSizeWidth}
					options={buttonSizeWidths}
					onChange={onChangeButtonStyleSizeWidth}
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
					label={__('Button ID', 'eightshift-boilerplate')}
					value={id}
					onChange={onChangeButtonId}
				/>
			}

		</Fragment>
	);
};
