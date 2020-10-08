import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, Icon } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';

export const paragraphSizes = [
	{ label: __('Default (22px)', 'eightshift-boilerplate'), value: 'default' },
	{ label: __('Small (18px)', 'eightshift-boilerplate'), value: 'small' },
];

export const ParagraphOptions = (props) => {
	const {
		paragraph: {
			color,
			size,
		},
		label,
		onChangeParagraphColor,
		onChangeParagraphSize,
	} = props;

	return (
		<Fragment>

			{label &&
				<h3>
					{label}
				</h3>
			}

			{onChangeParagraphColor &&
				<ColorPaletteCustom
					label={
						<Fragment>
							<Icon icon={icons.color} />
							{__('Color', 'eightshift-boilerplate')}
						</Fragment>
					}
					help={__('Change Color.', 'eightshift-boilerplate')}
					value={color}
					onChange={onChangeParagraphColor}
				/>
			}

			{onChangeParagraphSize &&
				<SelectControl
					label={__('Font Size', 'eightshift-boilerplate')}
					value={size}
					options={paragraphSizes}
					onChange={onChangeParagraphSize}
				/>
			}

		</Fragment>
	);
};

