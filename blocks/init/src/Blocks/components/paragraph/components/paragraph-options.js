import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
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
			use = true,
		},
		showControls = true,
		label = __('Paragraph', 'eightshift-boilerplate'),
		onChangeParagraphColor,
		onChangeParagraphSize,
		onChangeParagraphUse,
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

			{onChangeParagraphUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
					checked={use}
					onChange={onChangeParagraphUse}
				/>
			}

			{use &&
				<Fragment>
					{onChangeParagraphColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-boilerplate')}
								</Fragment>
							}
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
			}

		</Fragment>
	);
};

