import React from 'react';
import { __ } from '@wordpress/i18n';
import { ColorPaletteCustom, icons, getOption, checkAttr, getAttrKey, ComponentUseToggle, IconLabel, CustomSelect } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const QuoteOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		quoteShowControls = true,

		showQuoteUse = false,
		showLabel = false,
		showQuoteColor = true,
		showQuoteSize = true,
	} = attributes;

	if (!quoteShowControls) {
		return null;
	}

	const quoteUse = checkAttr('quoteUse', attributes, manifest);
	const quoteColor = checkAttr('quoteColor', attributes, manifest);
	const quoteSize = checkAttr('quoteSize', attributes, manifest);

	return (
		<>
			<ComponentUseToggle
				label={label}
				checked={quoteUse}
				onChange={(value) => setAttributes({ [getAttrKey('quoteUse', attributes, manifest)]: value })}
				showUseToggle={showQuoteUse}
				showLabel={showLabel}
			/>

			{quoteUse &&
				<>
					{showQuoteColor &&
						<ColorPaletteCustom
							label={<IconLabel icon={icons.color} label={__('Color', 'eightshift-frontend-libs')} />}
							colors={getOption('quoteColor', attributes, manifest, true)}
							value={quoteColor}
							onChange={(value) => setAttributes({ [getAttrKey('quoteColor', attributes, manifest)]: value })}
						/>
					}

					{showQuoteSize &&
						<CustomSelect
							label={<IconLabel icon={icons.textSize} label={__('Font size', 'eightshift-frontend-libs')} />}
							value={quoteSize}
							options={getOption('quoteSize', attributes, manifest)}
							onChange={(value) => setAttributes({ [getAttrKey('quoteSize', attributes, manifest)]: value })}
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
