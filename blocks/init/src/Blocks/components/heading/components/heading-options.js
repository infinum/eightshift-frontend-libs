import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { icons, getOption } from '@eightshift/frontend-libs/scripts/editor';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const HeadingOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		options,
		headingShowControls = true,

		showHeadingUse = true,
		showHeadingColor = true,
		showHeadingSize = true,
	} = attributes;

	if (!headingShowControls) {
		return null;
	}

	const headingUse = checkAttr('headingUse', attributes, manifest);
	const headingColor = checkAttr('headingColor', attributes, manifest);
	const headingSize = checkAttr('headingSize', attributes, manifest);

	return (
		<>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{showHeadingUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
					checked={headingUse}
					onChange={(value) => setAttributes({ [getAttrKey('headingUse', attributes, manifest)]: value })}
				/>
			}

			{headingUse &&
				<>
					{showHeadingColor &&
						<ColorPaletteCustom
							label={
								<>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-frontend-libs')}
								</>
							}
							colors={getOption('headingColor', attributes, manifest, options, true)}
							value={headingColor}
							onChange={(value) => setAttributes({ [getAttrKey('headingColor', attributes, manifest)]: value })}
						/>
					}

					{showHeadingSize &&
						<SelectControl
							label={
								<>
									<Icon icon={icons.textSize} />
									{__('Text size', 'eightshift-frontend-libs')}
								</>
							}
							value={headingSize}
							options={getOption('headingSize', attributes, manifest, options)}
							onChange={(value) => setAttributes({ [getAttrKey('headingSize', attributes, manifest)]: value })}
						/>
					}
				</>
			}

		</>
	);
};
