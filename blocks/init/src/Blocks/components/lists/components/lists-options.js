import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
import { icons, getOption } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const ListsOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		listsShowControls = true,

		showListsUse = true,
		showListsColor = true,
		showListsSize = true,
	} = attributes;

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
					onChange={(value) => setAttributes({ [getAttrKey('listsUse', attributes, manifest)]: value })}
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
							colors={getOption('listsColor', attributes, manifest, true)}
							value={listsColor}
							onChange={(value) => setAttributes({ [getAttrKey('listsColor', attributes, manifest)]: value })}
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
							options={getOption('listsSize', attributes, manifest)}
							onChange={(value) => setAttributes({ [getAttrKey('listsSize', attributes, manifest)]: value })}
						/>
					}
				</>
			}

		</>
	);
};
