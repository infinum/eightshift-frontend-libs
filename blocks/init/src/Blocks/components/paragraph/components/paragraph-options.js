import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey, getOption, UseToggle, ColorPicker, ucfirst, Select, generateUseToggleConfig } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ParagraphOptions = (attributes) => {
	const {
		setAttributes,

		hideColor = false,
		hideSize = false,
		hideWeight = false,

		additionalControls,
		additionalControlsSplitArea,
	} = attributes;

	const paragraphColor = checkAttr('paragraphColor', attributes, manifest);
	const [fontSize, fontWeight] = checkAttr('paragraphSize', attributes, manifest)?.split(':') ?? '';

	const fontSizes = getOption('paragraphSize', attributes, manifest).reduce((all, { label, value, weights }) => ({
		...all,
		[value]: {
			label: label,
			value: value,
			weights: weights,
			weightOptions: weights.map((weight) => ({ label: ucfirst(weight), value: weight })),
		},
	}), {});

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'paragraphUse')}>
			{(!hideColor || !hideSize || !hideWeight) &&
				<div className={`es-h-spaced ${(additionalControls || additionalControlsSplitArea) ? 'es-mb-2' : ''}`}>
					{!hideColor &&
						<ColorPicker
							colors={getOption('paragraphColor', attributes, manifest, true)}
							value={paragraphColor}
							onChange={(value) => setAttributes({ [getAttrKey('paragraphColor', attributes, manifest)]: value })}
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
							onChange={(value) => setAttributes({ [getAttrKey('paragraphSize', attributes, manifest)]: `${value}:${fontSizes[value]?.weights[0] ?? 'bold'}` })}
							additionalSelectClasses='es-w-16'
							placeholder={__('Size', 'eightshift-frontend-libs')}
							noBottomSpacing
							simpleValue
							noSearch
						/>
					}

					{!hideWeight &&
						<Select
							value={fontWeight}
							options={fontSizes[fontSize]?.weightOptions}
							onChange={(value) => setAttributes({ [getAttrKey('paragraphSize', attributes, manifest)]: `${fontSize}:${value}` })}
							additionalSelectClasses='es-min-w-20 es-flex-shrink-0 es-flex-grow-1'
							placeholder={__('Weight', 'eightshift-frontend-libs')}
							disabled={fontSizes[fontSize]?.weights.length < 2}
							noBottomSpacing
							simpleValue
							noSearch
							closeMenuAfterSelect={false}
						/>
					}
				</div>
			}

			{additionalControlsSplitArea &&
				<div className='es-fifty-fifty-h-wrap'>
					{additionalControlsSplitArea}
				</div>
			}

			{additionalControls}
		</UseToggle>
	);
};
