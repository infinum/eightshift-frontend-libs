import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
import { icons, getOptionColors, getOptions } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const ListsOptions = (attributes) => {
	const {
		componentName: manifestComponentName,
		title: manifestTitle,
		options: manifestOptions,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = manifestTitle,
		listsShowControls = true,

		showListsUse = true,
		showListsColor = true,
		showListsSize = true,
	} = attributes;

	const options = {...manifestOptions, ...attributes.options};

	if (!listsShowControls) {
		return null;
	}


	const listsUse = checkAttr('listsUse', attributes, manifest);
	const listsColor = checkAttr('listsColor', attributes, manifest);
	const listsSize = checkAttr('listsSize', attributes, manifest);

	return (
		<>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{showListsUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
					checked={listsUse}
					onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
				/>
			}

			{listsUse &&
				<>
					{showListsColor &&
						<ColorPaletteCustom
							label={
								<>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-frontend-libs')}
								</>
							}
							colors={getOptionColors(getOptions(manifest, componentName, 'color', options))}
							value={listsColor}
							onChange={(value) => setAttributes({ [`${componentName}Color`]: value })}
						/>
					}

					{showListsSize &&
						<SelectControl
							label={
								<>
									<Icon icon={icons.textSize} />
									{__('Text size', 'eightshift-frontend-libs')}
								</>
							}
							value={listsSize}
							options={getOptions(manifest, componentName, 'size', options)}
							onChange={(value) => setAttributes({ [`${componentName}Size`]: value })}
						/>
					}
				</>
			}

		</>
	);
};
