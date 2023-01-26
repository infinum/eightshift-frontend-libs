import React from 'react';
import { __ } from '@wordpress/i18n';
import { icons, getOption, checkAttr, getAttrKey, IconLabel, OptionSelector, UseToggle, ColorPicker, ucfirst, Select, generateUseToggleConfig } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const ListsOptions = (attributes) => {
	const {
		setAttributes,

		showListsColor = true,
		showListsSize = true,
		showListsFontWeight = true,
		showListsOrdered = true,


		additionalControls,
	} = attributes;

	const listsColor = checkAttr('listsColor', attributes, manifest);
	const listsSize = checkAttr('listsSize', attributes, manifest);
	const listsOrdered = checkAttr('listsOrdered', attributes, manifest);

	const fontSizes = getOption('listsSize', attributes, manifest);
	const currentFontSize = fontSizes.find((size) => listsSize.includes(size.value));

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'listsUse')}>
			{(showListsSize || showListsFontWeight) &&
				<div className={`es-h-spaced ${(showListsOrdered || showListsColor) ? 'es-mb-5' : ''}`}>
					{showListsColor &&
						<ColorPicker
							label={(showListsSize && showListsFontWeight) ? null : <IconLabel icon={icons.color} label={__('Color', 'eightshift-frontend-libs')} />}
							colors={getOption('listsColor', attributes, manifest, true)}
							value={listsColor}
							onChange={(value) => setAttributes({ [getAttrKey('listsColor', attributes, manifest)]: value })}
							additionalTriggerClasses='es-slight-button-border-cool-gray-400 es-button-square-36 es-rounded-1!'
							type='textColor'
							colorPaletteLayout='list'
							noBottomSpacing
						/>
					}

					{showListsSize &&
						<Select
							label={(showListsFontWeight || showListsColor) ? null : <IconLabel icon={icons.textSize} label={__('Font size', 'eightshift-frontend-libs')} />}
							value={listsSize?.includes('-') ? listsSize.slice(0, listsSize.lastIndexOf('-')) : listsSize}
							options={fontSizes}
							onChange={(value) => setAttributes({ [getAttrKey('listsSize', attributes, manifest)]: `${value}-${fontSizes.find((size) => value.includes(size.value))?.weights?.[0] ?? 'bold'}` })}
							additionalSelectClasses='es-w-16'
							placeholder={__('Size', 'eightshift-frontend-libs')}
							isClearable={false}
							isSearchable={false}
							simpleValue
							noBottomSpacing
							isCompact
						/>
					}

					{showListsFontWeight &&
						<Select
							key={listsSize}
							label={(showListsSize || showListsColor) ? null : <IconLabel icon={icons.textSize} label={__('Font weight', 'eightshift-frontend-libs')} />}
							value={listsSize?.includes('-') ? listsSize.slice(listsSize.lastIndexOf('-') + 1) : listsSize}
							options={currentFontSize?.weights.map((weight) => ({ label: ucfirst(weight), value: weight }))}
							onChange={(value) => setAttributes({ [getAttrKey('listsSize', attributes, manifest)]: `${currentFontSize.value}-${value}` })}
							additionalSelectClasses='es-min-w-20 es-flex-shrink-0 es-flex-grow-1'
							placeholder={__('Weight', 'eightshift-frontend-libs')}
							disabled={currentFontSize && currentFontSize?.weights?.length < 2}
							isClearable={false}
							isSearchable={false}
							simpleValue
							noBottomSpacing
							isCompact
						/>
					}
				</div>
			}

			{showListsOrdered &&
				<OptionSelector
					label={__('Type', 'eightshift-frontend-libs')}
					value={listsOrdered}
					options={getOption('listsOrdered', attributes, manifest)}
					onChange={(value) => setAttributes({ [getAttrKey('listsOrdered', attributes, manifest)]: value })}
					iconOnly
					noBottomSpacing={!additionalControls}
				/>
			}

			{additionalControls}
		</UseToggle>
	);
};
