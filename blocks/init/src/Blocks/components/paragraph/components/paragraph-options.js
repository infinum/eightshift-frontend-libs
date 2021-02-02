import React from 'react';
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { icons, getOptionColors } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';

const { options, title } = manifest;

export const ParagraphOptions = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		paragraphShowControls = true,

		paragraphUse = checkAttr('paragraphUse', attributes, manifest, componentName),

		paragraphColor = checkAttr('paragraphColor', attributes, manifest, componentName),
		paragraphSize = checkAttr('paragraphSize', attributes, manifest, componentName),

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
				label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
				checked={paragraphUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{paragraphUse &&
				<Fragment>
					{showParagraphColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-frontend-libs')}
								</Fragment>
							}
							colors={getOptionColors(options.colors)}
							value={paragraphColor}
							onChange={(value) => setAttributes({ [`${componentName}Color`]: value })}
						/>
					}

					{showParagraphSize &&
						<SelectControl
							label={
								<Fragment>
									<Icon icon={icons.textSize} />
									{__('Text size', 'eightshift-frontend-libs')}
								</Fragment>
							}
							value={paragraphSize}
							options={options.sizes}
							onChange={(value) => setAttributes({ [`${componentName}Size`]: value })}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
