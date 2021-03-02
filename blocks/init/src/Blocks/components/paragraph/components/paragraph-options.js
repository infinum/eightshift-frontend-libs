import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { icons, getOptionColors, getOptions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';

export const ParagraphOptions = (attributes) => {
	const { title } = manifest;

	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		options = options,
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
		<>

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
				<>
					{showParagraphColor &&
						<ColorPaletteCustom
							label={
								<>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-frontend-libs')}
								</>
							}
							colors={getOptionColors(getOptions(manifest, componentName, 'color', options))}
							value={paragraphColor}
							onChange={(value) => setAttributes({ [`${componentName}Color`]: value })}
						/>
					}

					{showParagraphSize &&
						<SelectControl
							label={
								<>
									<Icon icon={icons.textSize} />
									{__('Text size', 'eightshift-frontend-libs')}
								</>
							}
							value={paragraphSize}
							options={getOptions(manifest, componentName, 'size', options)}
							onChange={(value) => setAttributes({ [`${componentName}Size`]: value })}
						/>
					}
				</>
			}

		</>
	);
};
