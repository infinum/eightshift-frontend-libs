import React from 'react';
import { __ } from '@wordpress/i18n';
import { ColorPaletteCustom, icons, getOption, checkAttr, getAttrKey, ComponentUseToggle, IconLabel, CustomSelect } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const BlockquoteOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		blockquoteShowControls = true,

		showBlockquoteUse = false,
		showLabel = false,
		showBlockquoteColor = true,
		showBlockquoteSize = true,
	} = attributes;

	if (!blockquoteShowControls) {
		return null;
	}

	const blockquoteUse = checkAttr('blockquoteUse', attributes, manifest);
	const blockquoteColor = checkAttr('blockquoteColor', attributes, manifest);
	const blockquoteSize = checkAttr('blockquoteSize', attributes, manifest);

	return (
		<>
			<ComponentUseToggle
				label={label}
				checked={blockquoteUse}
				onChange={(value) => setAttributes({ [getAttrKey('blockquoteUse', attributes, manifest)]: value })}
				showUseToggle={showBlockquoteUse}
				showLabel={showLabel}
			/>

			{blockquoteUse &&
				<>
					{showBlockquoteColor &&
						<ColorPaletteCustom
							label={<IconLabel icon={icons.color} label={__('Color', 'eightshift-frontend-libs')} />}
							colors={getOption('blockquoteColor', attributes, manifest, true)}
							value={blockquoteColor}
							onChange={(value) => setAttributes({ [getAttrKey('blockquoteColor', attributes, manifest)]: value })}
						/>
					}

					{showBlockquoteSize &&
						<CustomSelect
							label={<IconLabel icon={icons.textSize} label={__('Font size', 'eightshift-frontend-libs')} />}
							value={blockquoteSize}
							options={getOption('blockquoteSize', attributes, manifest)}
							onChange={(value) => setAttributes({ [getAttrKey('blockquoteSize', attributes, manifest)]: value })}
							simpleValue
							isClearable={false}
							isSearchable={false}
						/>
					}
				</>
			}
		</>
	);
};
