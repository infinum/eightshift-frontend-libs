import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey, getOption, CollapsableComponentUseToggle, IconLabel, icons, ColorPickerComponent, CustomSelect, ucfirst, ColorPickerType, ColorPaletteCustomLayout } from '@eightshift/frontend-libs/scripts';
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
		showLabel = true,
		showParagraphColor = true,
		showParagraphSize = true,
		showParagraphFontWeight = true,

		showExpanderButton = true,

		additionalControls,
		additionalControlsSplitArea,

		hasInsetLabel = false,
	} = attributes;

	if (!paragraphShowControls) {
		return null;
	}

	const paragraphUse = checkAttr('paragraphUse', attributes, manifest);
	const paragraphColor = checkAttr('paragraphColor', attributes, manifest);
	const paragraphSize = checkAttr('paragraphSize', attributes, manifest);

	const fontSizes = getOption('paragraphSize', attributes, manifest);
	const currentFontSize = fontSizes.find((size) => paragraphSize.includes(size.value));

	return (
		<CollapsableComponentUseToggle
			label={label}
			checked={paragraphUse}
			onChange={(value) => setAttributes({ [getAttrKey('paragraphUse', attributes, manifest)]: value })}
			showUseToggle={showParagraphUse}
			showLabel={showLabel}
			showExpanderButton={showExpanderButton}
			additionalClasses={hasInsetLabel ? 'has-inset-label' : ''}
		>
			{(showParagraphColor || showParagraphSize || showParagraphFontWeight) &&
				<div className={`es-h-spaced ${(additionalControls || additionalControlsSplitArea) ? 'es-mb-5' : ''}`}>
					{showParagraphColor &&
						<ColorPickerComponent
							label={(showParagraphSize && showParagraphFontWeight) ? null : <IconLabel icon={icons.color} label={__('Color', 'eightshift-frontend-libs')} />}
							colors={getOption('paragraphColor', attributes, manifest, true)}
							value={paragraphColor}
							onChange={(value) => setAttributes({ [getAttrKey('paragraphColor', attributes, manifest)]: value })}
							type={ColorPickerType.TEXT_COLOR}
							additionalTriggerClasses='es-input-matched-slight-button-border'
							colorPaletteLayout={ColorPaletteCustomLayout.LIST}
						/>
					}

					{showParagraphSize &&
						<CustomSelect
							label={(showParagraphColor && showParagraphFontWeight) ? null : <IconLabel icon={icons.textSize} label={__('Font size', 'eightshift-frontend-libs')} />}
							value={paragraphSize?.includes('-') ? paragraphSize.slice(0, paragraphSize.lastIndexOf('-')) : paragraphSize}
							options={fontSizes}
							onChange={(value) => setAttributes({ [getAttrKey('paragraphSize', attributes, manifest)]: `${value}-${fontSizes.find((size) => value.includes(size.value))?.weights?.[0] ?? 'bold'}` })}
							additionalClasses='es-w-21 es-flex-shrink-0 es-flex-grow-0'
							placeholder={__('Size', 'eightshift-frontend-libs')}
							isClearable={false}
							isSearchable={false}
							simpleValue
							isCompact
						/>
					}

					{showParagraphFontWeight &&
						<CustomSelect
							key={paragraphSize}
							label={(showParagraphColor && showParagraphSize) ? null : <IconLabel icon={icons.textSize} label={__('Font weight', 'eightshift-frontend-libs')} />}
							value={paragraphSize?.includes('-') ? paragraphSize.slice(paragraphSize.lastIndexOf('-') + 1) : paragraphSize}
							options={currentFontSize?.weights.map((weight) => ({ label: ucfirst(weight), value: weight }))}
							onChange={(value) => setAttributes({ [getAttrKey('paragraphSize', attributes, manifest)]: `${currentFontSize.value}-${value}` })}
							additionalClasses='es-min-w-27 es-flex-shrink-0 es-flex-grow-1'
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

			{additionalControlsSplitArea &&
				<div className='es-fifty-fifty-h-wrap -es-mb-3'>
					{additionalControlsSplitArea}
				</div>
			}

			{additionalControls}
		</CollapsableComponentUseToggle>
	);
};
