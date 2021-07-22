import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom, checkAttr, getAttrKey, icons, getOption } from '@eightshift/frontend-libs/scripts';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
import manifest from './../manifest.json';

export const ParagraphOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		paragraphShowControls = true,

		showParagraphUse = true,
		showParagraphColor = true,
		showParagraphSize = true,
	} = attributes;

	if (!paragraphShowControls) {
		return null;
	}
	
	const paragraphUse = checkAttr('paragraphUse', attributes, manifest);
	const paragraphColor = checkAttr('paragraphColor', attributes, manifest);
	const paragraphSize = checkAttr('paragraphSize', attributes, manifest);

	return (
		<>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{showParagraphUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
					checked={paragraphUse}
					onChange={(value) => setAttributes({ [getAttrKey('paragraphUse', attributes, manifest)]: value })}
				/>
			}

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
							colors={getOption('paragraphColor', attributes, manifest, true)}
							value={paragraphColor}
							onChange={(value) => setAttributes({ [getAttrKey('paragraphColor', attributes, manifest)]: value })}
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
							options={getOption('paragraphSize', attributes, manifest)}
							onChange={(value) => setAttributes({ [getAttrKey('paragraphSize', attributes, manifest)]: value })}
						/>
					}
				</>
			}

		</>
	);
};
