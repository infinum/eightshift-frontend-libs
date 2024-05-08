import React from 'react';
import { __ } from '@wordpress/i18n';
import {
	getOption,
	checkAttr,
	getAttrKey,
	OptionSelector,
	UseToggle,
	ColorPicker,
	ucfirst,
	Select,
	generateUseToggleConfig,
	Section,
} from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const ListsOptions = (attributes) => {
	const {
		setAttributes,

		hideColor = false,
		hideSize = false,
		hideWeight = false,
		hideTypePicker = false,

		additionalControls,
	} = attributes;

	const listsColor = checkAttr('listsColor', attributes, manifest);
	const listsOrdered = checkAttr('listsOrdered', attributes, manifest);

	const [fontSize, fontWeight] = checkAttr('listsSize', attributes, manifest)?.split(':') ?? '';

	const fontSizes = getOption('listsSize', attributes, manifest).reduce((all, { label, value, weights }) => ({
		...all,
		[value]: {
			label: label,
			value: value,
			weights: weights,
			weightOptions: weights.map((weight) => ({ label: ucfirst(weight), value: weight })),
		},
	}), {});

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'listsUse')} noBottomSpacing={hideTypePicker && !additionalControls}>
			<Section showIf={!hideColor || !hideSize || !hideWeight} additionalClasses='es-h-spaced'>
				{!hideColor &&
					<ColorPicker
						colors={getOption('listsColor', attributes, manifest, true)}
						value={listsColor}
						onChange={(value) => setAttributes({ [getAttrKey('listsColor', attributes, manifest)]: value })}
						type='textColor'
						additionalTriggerClasses='es-slight-button-border-cool-gray-400 es-button-square-36 es-rounded-1!'
						noBottomSpacing
					/>
				}

				{!hideSize &&
					<Select
						value={fontSize}
						options={Object.values(fontSizes)}
						onChange={(value) => setAttributes({
							[getAttrKey('listsSize', attributes, manifest)]: `${value}:${fontSizes[value]?.weights[0] ?? 'bold'}`,
						})}
						additionalSelectClasses='es-w-16'
						placeholder={__('Size', '%g_textdomain%')}
						noBottomSpacing
						simpleValue
						noSearch
					/>
				}

				{!hideWeight &&
					<Select
						value={fontWeight}
						options={fontSizes[fontSize]?.weightOptions}
						onChange={(value) => setAttributes({ [getAttrKey('listsSize', attributes, manifest)]: `${fontSize}:${value}` })}
						additionalSelectClasses='es-min-w-20 es-flex-shrink-0 es-flex-grow-1'
						placeholder={__('Weight', '%g_textdomain%')}
						disabled={fontSizes[fontSize]?.weights.length < 2}
						noBottomSpacing
						simpleValue
						noSearch
					/>
				}
			</Section>

			{!hideTypePicker &&
				<OptionSelector
					label={__('Type', '%g_textdomain%')}
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
