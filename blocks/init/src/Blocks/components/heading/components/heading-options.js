import React from 'react';
import { __ } from '@wordpress/i18n';
import { icons, getOption, checkAttr, getAttrKey, IconLabel, CollapsableComponentUseToggle, SimpleHorizontalSingleSelect, ColorPickerComponent, CustomSelect, ucfirst, ColorPickerType, ColorPaletteCustomLayout } from '@eightshift/frontend-libs/scripts';
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
		showLabel = true,
		showHeadingColor = true,
		showHeadingSize = true,
		showHeadingFontWeight = true,
		showHeadingLevel = true,

		showExpanderButton = true,

		additionalControls,
		additionalControlsSplitArea,

		hasInsetLabel = false,
	} = attributes;

	if (!headingShowControls) {
		return null;
	}

	const headingUse = checkAttr('headingUse', attributes, manifest);
	const headingColor = checkAttr('headingColor', attributes, manifest);
	const headingSize = checkAttr('headingSize', attributes, manifest);
	const headingLevel = checkAttr('headingLevel', attributes, manifest);

	const fontSizes = getOption('headingSize', attributes, manifest);
	const currentFontSize = fontSizes.find((size) => headingSize.includes(size.value));

	return (
		<CollapsableComponentUseToggle
			label={label}
			checked={headingUse}
			onChange={(value) => setAttributes({ [getAttrKey('headingUse', attributes, manifest)]: value })}
			showUseToggle={showHeadingUse}
			showLabel={showLabel}
			showExpanderButton={showExpanderButton}
			additionalClasses={hasInsetLabel ? 'has-inset-label' : ''}
		>
			{(showHeadingColor || showHeadingSize || showHeadingFontWeight) &&
				<div className={`es-h-spaced ${(additionalControls || additionalControlsSplitArea || showHeadingLevel) ? 'es-mb-5' : ''}`}>
					{showHeadingColor &&
						<ColorPickerComponent
							label={(showHeadingSize && showHeadingFontWeight) ? null : <IconLabel icon={icons.color} label={__('Color', 'eightshift-frontend-libs')} />}
							colors={getOption('headingColor', attributes, manifest, true)}
							value={headingColor}
							onChange={(value) => setAttributes({ [getAttrKey('headingColor', attributes, manifest)]: value })}
							type={ColorPickerType.TEXT_COLOR}
							additionalTriggerClasses='es-input-matched-slight-button-border'
							colorPaletteLayout={ColorPaletteCustomLayout.LIST}
						/>
					}

					{showHeadingSize &&
						<CustomSelect
							label={(showHeadingColor && showHeadingFontWeight) ? null : <IconLabel icon={icons.textSize} label={__('Font size', 'eightshift-frontend-libs')} />}
							value={headingSize?.includes('-') ? headingSize.slice(0, headingSize.lastIndexOf('-')) : headingSize}
							options={fontSizes}
							onChange={(value) => setAttributes({ [getAttrKey('headingSize', attributes, manifest)]: `${value}-${fontSizes.find((size) => value.includes(size.value))?.weights?.[0] ?? 'bold'}` })}
							additionalClasses='es-w-21 es-flex-shrink-0 es-flex-grow-0'
							placeholder={__('Size', 'eightshift-frontend-libs')}
							isClearable={false}
							isSearchable={false}
							simpleValue
							isCompact
						/>
					}

					{showHeadingFontWeight &&
						<CustomSelect
							key={headingSize}
							label={(showHeadingColor && showHeadingSize) ? null : <IconLabel icon={icons.textSize} label={__('Font weight', 'eightshift-frontend-libs')} />}
							value={headingSize?.includes('-') ? headingSize.slice(headingSize.lastIndexOf('-') + 1) : headingSize}
							options={currentFontSize?.weights.map((weight) => ({ label: ucfirst(weight), value: weight }))}
							onChange={(value) => setAttributes({ [getAttrKey('headingSize', attributes, manifest)]: `${currentFontSize.value}-${value}` })}
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

			{(showHeadingLevel || additionalControlsSplitArea) &&
				<div className='es-fifty-fifty-h-wrap -es-mb-3'>
					{showHeadingLevel &&
						<SimpleHorizontalSingleSelect
							label={__('Heading level', 'eightshift-frontend-libs')}
							options={[
								{ label: '1', tooltip: __('Heading 1', 'eightshift-frontend-libs'), value: 1, icon: icons.h1 },
								{ label: '2', tooltip: __('Heading 2', 'eightshift-frontend-libs'), value: 2, icon: icons.h2 },
								{ label: '3', tooltip: __('Heading 3', 'eightshift-frontend-libs'), value: 3, icon: icons.h3 },
								{ label: '4', tooltip: __('Heading 4', 'eightshift-frontend-libs'), value: 4, icon: icons.h4 },
								{ label: '5', tooltip: __('Heading 5', 'eightshift-frontend-libs'), value: 5, icon: icons.h5 },
								{ label: '6', tooltip: __('Heading 6', 'eightshift-frontend-libs'), value: 6, icon: icons.h6 },
							]}
							value={headingLevel}
							onChange={(value) => setAttributes({ [getAttrKey('headingLevel', attributes, manifest)]: value })}
							border='offset'
							additionalButtonClass='es-button-square-36'
							iconOnly
						/>
					}

					{additionalControlsSplitArea}
				</div>
			}

			{additionalControls}
		</CollapsableComponentUseToggle>
	);
};
