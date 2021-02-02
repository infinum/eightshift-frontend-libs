import React from 'react';
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
import { icons, getOptionColors } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

const { options, title } = manifest;

export const ListsOptions = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		listsShowControls = true,

		listsUse = checkAttr('listsUse', attributes, manifest, componentName),

		listsColor = checkAttr('listsColor', attributes, manifest, componentName),
		listsSize = checkAttr('listsSize', attributes, manifest, componentName),

		showListsColor = true,
		showListsSize = true,
	} = attributes;

	if (!listsShowControls) {
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
				checked={listsUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{listsUse &&
				<Fragment>
					{showListsColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-frontend-libs')}
								</Fragment>
							}
							colors={getOptionColors(options.colors)}
							value={listsColor}
							onChange={(value) => setAttributes({ [`${componentName}Color`]: value })}
						/>
					}

					{showListsSize &&
						<SelectControl
							label={
								<Fragment>
									<Icon icon={icons.textSize} />
									{__('Text size', 'eightshift-frontend-libs')}
								</Fragment>
							}
							value={listsSize}
							options={options.sizes}
							onChange={(value) => setAttributes({ [`${componentName}Size`]: value })}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
