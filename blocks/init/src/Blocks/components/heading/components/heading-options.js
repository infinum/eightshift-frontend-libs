import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { icons, getOption, checkAttr, getAttrKey, IconLabel, UseToggle, OptionSelector, ucfirst, Select, ColorPicker, Section, generateUseToggleConfig } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const HeadingOptions = (attributes) => {
	const {
		setAttributes,

		showHeadingColor = true,
		showHeadingSize = true,
		showHeadingFontWeight = true,

		hideHeadingLevel = false,

		additionalControls,
		additionalControlsBeforeHeadingLevel,
	} = attributes;

	const headingColor = checkAttr('headingColor', attributes, manifest);
	const headingSize = checkAttr('headingSize', attributes, manifest);
	const headingLevel = checkAttr('headingLevel', attributes, manifest);

	const fontSizes = getOption('headingSize', attributes, manifest);
	const currentFontSize = fontSizes.find((size) => headingSize.includes(size.value));

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'headingUse')}>
			<Section
				showIf={showHeadingColor || showHeadingSize || showHeadingFontWeight}
				additionalClasses='es-h-spaced'
				reducedBottomSpacing={additionalControlsBeforeHeadingLevel}
				noBottomSpacing={!additionalControlsBeforeHeadingLevel && !additionalControls && hideHeadingLevel}
			>
				{showHeadingColor &&
					<ColorPicker
						label={(showHeadingSize && showHeadingFontWeight) ? null : <IconLabel icon={icons.color} label={__('Color', 'eightshift-frontend-libs')} />}
						colors={getOption('headingColor', attributes, manifest, true)}
						value={headingColor}
						onChange={(value) => setAttributes({ [getAttrKey('headingColor', attributes, manifest)]: value })}
						type='textColor'
						additionalTriggerClasses='es-slight-button-border-cool-gray-400 es-button-square-36 es-rounded-1!'
						colorPaletteLayout='list'
						noBottomSpacing
					/>
				}

				{showHeadingSize &&
					<Select
						label={(showHeadingColor && showHeadingFontWeight) ? null : <IconLabel icon={icons.textSize} label={__('Font size', 'eightshift-frontend-libs')} />}
						value={headingSize?.includes('-') ? headingSize.slice(0, headingSize.lastIndexOf('-')) : headingSize}
						options={fontSizes}
						onChange={(value) => setAttributes({ [getAttrKey('headingSize', attributes, manifest)]: `${value}-${fontSizes.find((size) => value.includes(size.value))?.weights?.[0] ?? 'bold'}` })}
						additionalClasses='es-w-20 es-flex-shrink-0 es-flex-grow-0'
						placeholder={__('Size', 'eightshift-frontend-libs')}
						isClearable={false}
						isSearchable={false}
						simpleValue
						noBottomSpacing
						isCompact
					/>
				}

				{showHeadingFontWeight && currentFontSize?.weights?.length > 2 &&
					<Select
						key={headingSize}
						label={(showHeadingColor && showHeadingSize) ? null : <IconLabel icon={icons.textSize} label={__('Font weight', 'eightshift-frontend-libs')} />}
						value={headingSize?.includes('-') ? headingSize.slice(headingSize.lastIndexOf('-') + 1) : headingSize}
						options={currentFontSize?.weights.map((weight) => ({ label: ucfirst(weight), value: weight }))}
						onChange={(value) => setAttributes({ [getAttrKey('headingSize', attributes, manifest)]: `${currentFontSize.value}-${value}` })}
						additionalClasses='es-min-w-27 es-flex-shrink-0 es-flex-grow-1'
						placeholder={__('Weight', 'eightshift-frontend-libs')}
						isClearable={false}
						isSearchable={false}
						simpleValue
						noBottomSpacing
						isCompact
					/>
				}

				{/* {showHeadingFontWeight && currentFontSize?.weights.includes('bold') &&  currentFontSize?.weights?.length === 2 && */}
				{showHeadingFontWeight && currentFontSize?.weights?.length <= 2 &&
					<Button
						isPressed={headingSize.includes('bold')}
						icon={icons.bold}
						className='es-button-icon-24 es-is-v2-gutenberg-input-matched-button'
						onClick={() => {
							const currentWeight = headingSize?.includes('-') ? headingSize.slice(headingSize.lastIndexOf('-') + 1) : headingSize;
							const otherWeight = currentFontSize.weights.find((w) => w !== currentWeight);

							setAttributes({ [getAttrKey('headingSize', attributes, manifest)]: `${currentFontSize.value}-${otherWeight}` });
						}}
						disabled={currentFontSize?.weights?.length < 2}
					/>
				}
			</Section>

			{additionalControlsBeforeHeadingLevel}

			{!hideHeadingLevel &&
				<OptionSelector
					label={__('Heading level', 'eightshift-frontend-libs')}
					options={[
						{ label: 'H1', tooltip: __('Heading 1', 'eightshift-frontend-libs'), value: 1 },
						{ label: 'H2', tooltip: __('Heading 2', 'eightshift-frontend-libs'), value: 2 },
						{ label: 'H3', tooltip: __('Heading 3', 'eightshift-frontend-libs'), value: 3 },
						{ label: 'H4', tooltip: __('Heading 4', 'eightshift-frontend-libs'), value: 4 },
						{ label: 'H5', tooltip: __('Heading 5', 'eightshift-frontend-libs'), value: 5 },
						{ label: 'H6', tooltip: __('Heading 6', 'eightshift-frontend-libs'), value: 6 },
					]}
					value={headingLevel}
					onChange={(value) => setAttributes({ [getAttrKey('headingLevel', attributes, manifest)]: value })}
					additionalButtonClass='es-button-square-36 es-text-4 es-font-weight-300'
					border='offset'
					noBottomSpacing
					additionalContainerClass='es-max-w-29!'
				/>
			}

			{additionalControls}
		</UseToggle>
	);
};
