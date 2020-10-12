import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';

export const headingSizes = [
	{
		label: __('Default (115px)', 'eightshift-boilerplate'),
		value: 'default',
	},
	{
		label: __('Big (90px)', 'eightshift-boilerplate'),
		value: 'big',
	},
];

export const HeadingOptions = (props) => {
	const {
		heading: {
			color,
			size,
			use = true,
		},
		showControls = true,
		label = __('Heading', 'eightshift-boilerplate'),
		onChangeHeadingColor,
		onChangeHeadingSize,
		onChangeHeadingUse,
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

			{onChangeHeadingUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
					checked={use}
					onChange={onChangeHeadingUse}
				/>
			}

			{use &&
				<Fragment>
					{onChangeHeadingColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-boilerplate')}
								</Fragment>
							}
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
			}

		</Fragment>
	);
};
