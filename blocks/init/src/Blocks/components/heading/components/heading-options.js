import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom, icons, getOption, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
import manifest from './../manifest.json';

export const HeadingOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
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
							colors={getOption('headingColor', attributes, manifest, true)}
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
							options={getOption('headingSize', attributes, manifest)}
							onChange={(value) => setAttributes({ [getAttrKey('headingSize', attributes, manifest)]: value })}
						/>
					}
				</>
			}

		</>
	);
};
