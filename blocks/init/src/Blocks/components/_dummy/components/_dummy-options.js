import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey, getOption, UseToggle, ColorPicker, ucfirst, Select, generateUseToggleConfig, Section } from '@eightshift/frontend-libs/scripts';
import manifest from '@eightshift/frontend-libs/blocks/init/src/Blocks/components/%block-name-kebab-case%/manifest.json';

export const %block-name-pascal-case%Options = (attributes) => {
	const {
		setAttributes,

		hideColor = false,
		hideSize = false,
		hideWeight = false,

		additionalControls,
	} = attributes;

	const %block-name-camel-case%Color = checkAttr('%block-name-camel-case%Color', attributes, manifest);
	const [fontSize, fontWeight] = checkAttr('%block-name-camel-case%Size', attributes, manifest)?.split(':') ?? '';

	const fontSizes = getOption('%block-name-camel-case%Size', attributes, manifest).reduce((all, { label, value, weights }) => ({
		...all,
		[value]: {
			label: label,
			value: value,
			weights: weights,
			weightOptions: weights.map((weight) => ({ label: ucfirst(weight), value: weight })),
		},
	}), {});

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, '%block-name-camel-case%Use')}>
			<Section showIf={!hideColor || !hideSize || !hideWeight} reducedBottomSpacing={additionalControls} noBottomSpacing={!additionalControls} additionalClasses='es-h-spaced'>
				{!hideColor &&
					<ColorPicker
						colors={getOption('%block-name-camel-case%Color', attributes, manifest, true)}
						value={%block-name-camel-case%Color}
						onChange={(value) => setAttributes({ [getAttrKey('%block-name-camel-case%Color', attributes, manifest)]: value })}
						type='textColor'
						additionalTriggerClasses='es-slight-button-border-cool-gray-400 es-button-square-36 es-rounded-1!'
						colorPaletteLayout='list'
						noBottomSpacing
					/>
				}

				{!hideSize &&
					<Select
						value={fontSize}
						options={Object.values(fontSizes)}
						onChange={(value) => setAttributes({ [getAttrKey('%block-name-camel-case%Size', attributes, manifest)]: `${value}:${fontSizes[value]?.weights[0] ?? 'bold'}` })}
						additionalSelectClasses='es-w-16'
						placeholder={__('Size', '%block-name-kebab-case%')}
						noBottomSpacing
						simpleValue
						noSearch
					/>
				}

				{!hideWeight &&
					<Select
						value={fontWeight}
						options={fontSizes[fontSize]?.weightOptions}
						onChange={(value) => setAttributes({ [getAttrKey('%block-name-camel-case%Size', attributes, manifest)]: `${fontSize}:${value}` })}
						additionalSelectClasses='es-min-w-20 es-flex-shrink-0 es-flex-grow-1'
						placeholder={__('Weight', '%block-name-kebab-case%')}
						disabled={fontSizes[fontSize]?.weights.length < 2}
						noBottomSpacing
						simpleValue
						noSearch
					/>
				}
			</Section>

			{additionalControls}
		</UseToggle>
	);
};
