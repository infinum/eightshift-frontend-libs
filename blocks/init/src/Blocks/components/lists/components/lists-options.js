import React from 'react';
import { __ } from '@wordpress/i18n';
import { icons, getOption, checkAttr, getAttrKey, IconLabel, IconToggle, SimpleHorizontalSingleSelect, CollapsableComponentUseToggle, ColorPickerComponent, CustomSelect, ucfirst, ColorPickerType, ColorPaletteCustomLayout } from '@eightshift/frontend-libs/scripts';
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
		showLabel = true,
		showListsColor = true,
		showListsSize = true,
		showListsFontWeight = true,
		showListsColorOnlyMarker = true,
		showListsOrdered = true,

		showExpanderButton = true,

		additionalControlsSplitArea,
		additionalControls,
	} = attributes;

	if (!listsShowControls) {
		return null;
	}

	const listsUse = checkAttr('listsUse', attributes, manifest);
	const listsColor = checkAttr('listsColor', attributes, manifest);
	const listsSize = checkAttr('listsSize', attributes, manifest);
	const listsColorOnlyMarker = checkAttr('listsColorOnlyMarker', attributes, manifest);
	const listsOrdered = checkAttr('listsOrdered', attributes, manifest);

	const fontSizes = getOption('listsSize', attributes, manifest);
	const currentFontSize = fontSizes.find((size) => listsSize.includes(size.value));

	return (
		<CollapsableComponentUseToggle
			label={label}
			checked={listsUse}
			onChange={(value) => setAttributes({ [getAttrKey('listsUse', attributes, manifest)]: value })}
			showUseToggle={showListsUse}
			showLabel={showLabel}
			showExpanderButton={showExpanderButton}
		>
			{(showListsSize || showListsFontWeight) &&
				<div className={`es-h-spaced ${(showListsOrdered || showListsColor) ? 'es-mb-5' : ''}`}>
					{showListsColor &&
						<ColorPickerComponent
							label={(showListsSize && showListsFontWeight) ? null : <IconLabel icon={icons.color} label={__('Color', 'eightshift-frontend-libs')} />}
							colors={getOption('listsColor', attributes, manifest, true)}
							value={listsColor}
							onChange={(value) => setAttributes({ [getAttrKey('listsColor', attributes, manifest)]: value })}
							additionalTriggerClasses='es-input-matched-slight-button-border'
							type={ColorPickerType.TEXT_COLOR}
							colorPaletteLayout={ColorPaletteCustomLayout.LIST}
						/>
					}

					{showListsSize &&
						<CustomSelect
							label={(showListsFontWeight || showListsColor) ? null : <IconLabel icon={icons.textSize} label={__('Font size', 'eightshift-frontend-libs')} />}
							value={listsSize?.includes('-') ? listsSize.slice(0, listsSize.lastIndexOf('-')) : listsSize}
							options={fontSizes}
							onChange={(value) => setAttributes({ [getAttrKey('listsSize', attributes, manifest)]: `${value}-${fontSizes.find((size) => value.includes(size.value))?.weights?.[0] ?? 'bold'}` })}
							additionalClasses='es-w-21 es-flex-shrink-0 es-flex-grow-0'
							placeholder={__('Size', 'eightshift-frontend-libs')}
							isClearable={false}
							isSearchable={false}
							simpleValue
							isCompact
						/>
					}

					{showListsFontWeight &&
						<CustomSelect
							key={listsSize}
							label={(showListsSize || showListsColor) ? null : <IconLabel icon={icons.textSize} label={__('Font weight', 'eightshift-frontend-libs')} />}
							value={listsSize?.includes('-') ? listsSize.slice(listsSize.lastIndexOf('-') + 1) : listsSize}
							options={currentFontSize?.weights.map((weight) => ({ label: ucfirst(weight), value: weight }))}
							onChange={(value) => setAttributes({ [getAttrKey('listsSize', attributes, manifest)]: `${currentFontSize.value}-${value}` })}
							additionalClasses='es-w-27 es-flex-shrink-0 es-flex-grow-0'
							placeholder={__('Weight', 'eightshift-frontend-libs')}
							disabled={currentFontSize && currentFontSize?.weights?.length < 2}
							isClearable={false}
							isSearchable={false}
							simpleValue
							isCompact
						/>
					}
				</div>
			}



			{(additionalControlsSplitArea || showListsOrdered) &&
				<div className='es-fifty-fifty-h-wrap'>
					{showListsOrdered &&
						<SimpleHorizontalSingleSelect
							label={__('List type', 'eightshift-frontend-libs')}
							value={listsOrdered}
							options={getOption('listsOrdered', attributes, manifest)}
							onChange={(value) => setAttributes({ [getAttrKey('listsOrdered', attributes, manifest)]: value })}
							border='offset'
							iconOnly
						/>
					}

					{additionalControlsSplitArea}
				</div>
			}

			{additionalControls}

			{showListsColor && showListsColorOnlyMarker &&
				<IconToggle
					icon={icons.colorAlt}
					label={__('Color list markers only', 'eightshift-frontend-libs')}
					checked={listsColorOnlyMarker}
					onChange={(value) => setAttributes({ [getAttrKey('listsColorOnlyMarker', attributes, manifest)]: value })}
				/>
			}
		</CollapsableComponentUseToggle>
	);
};
