import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import { SelectControl, Icon } from '@wordpress/components';

export const headingSizes = [
	{ label: __('Default (115px)', 'eightshift-boilerplate'), value: 'default' },
	{ label: __('Big (90px)', 'eightshift-boilerplate'), value: 'big' },
];

export const HeadingOptions = (props) => {
	const {
		heading: {
			color,
			size,
		},
		label,
		onChangeHeadingColor,
		onChangeHeadingSize,
	} = props;

	return (
		<Fragment>

			{label &&
				<h3>
					{label}
				</h3>
			}

			{onChangeHeadingColor &&
				<ColorPaletteCustom
					label={
						<Fragment>
							<Icon icon={icons.color} />
							{__('Color', 'eightshift-boilerplate')}
						</Fragment>
					}
					help={__('Change color', 'eightshift-boilerplate')}
					value={color}
					onChange={onChangeHeadingColor}
				/>
			}

			{onChangeHeadingSize &&
				<SelectControl
					label={__('Size', 'eightshift-boilerplate')}
					value={size}
					options={headingSizes}
					onChange={onChangeHeadingSize}
				/>
			}

		</Fragment>
	);
};
