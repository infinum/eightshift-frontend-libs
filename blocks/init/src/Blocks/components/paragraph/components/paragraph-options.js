import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';

const { options, title } = manifest;

export const ParagraphOptions = (attributes) => {
	const {
		setAttributes,
		label = title,
		paragraphShowControls = true,

		paragraphUse,

		paragraphColor,
		paragraphSize,

		showParagraphColor = true,
		showParagraphSize = true,
	} = attributes;

	if (!paragraphShowControls) {
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
				checked={paragraphUse}
				onChange={(value) => setAttributes({ paragraphUse: value })}
			/>

			{paragraphUse &&
				<Fragment>
					{showParagraphColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-boilerplate')}
								</Fragment>
							}
							value={paragraphColor}
							onChange={(value) => setAttributes({ paragraphColor: value })}
						/>
					}

					{showParagraphSize &&
						<SelectControl
							label={__('Size', 'eightshift-boilerplate')}
							value={paragraphSize}
							options={options.sizes}
							onChange={(value) => setAttributes({ paragraphSize: value })}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
