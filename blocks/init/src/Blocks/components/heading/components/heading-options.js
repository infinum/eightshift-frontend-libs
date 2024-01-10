import React from 'react';
import { __ } from '@wordpress/i18n';
import {
	icons,
	getOption,
	checkAttr,
	getAttrKey,
	IconLabel,
	UseToggle,
	ucfirst,
	Select,
	ColorPicker,
	Section,
	generateUseToggleConfig,
	Menu,
	MenuItem,
} from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const HeadingOptions = (attributes) => {
	const {
		setAttributes,

		hideColor = false,
		hideSize = false,
		hideFontWeight = false,

		hideHeadingLevel = false,

		additionalControls,
	} = attributes;

	const headingColor = checkAttr('headingColor', attributes, manifest);
	const headingLevel = checkAttr('headingLevel', attributes, manifest);

	const [fontSize, fontWeight] = checkAttr('headingSize', attributes, manifest)?.split(':') ?? '';

	const fontSizes = getOption('headingSize', attributes, manifest).reduce((all, { label, value, weights }) => ({
		...all,
		[value]: {
			label: label,
			value: value,
			weights: weights,
			weightOptions: weights.map((weight) => ({ label: ucfirst(weight), value: weight })),
		},
	}), {});

	const headingLevels = [
		{ label: 'H1', tooltip: __('Heading 1', 'eightshift-frontend-libs'), value: 1 },
		{ label: 'H2', tooltip: __('Heading 2', 'eightshift-frontend-libs'), value: 2 },
		{ label: 'H3', tooltip: __('Heading 3', 'eightshift-frontend-libs'), value: 3 },
		{ label: 'H4', tooltip: __('Heading 4', 'eightshift-frontend-libs'), value: 4 },
		{ label: 'H5', tooltip: __('Heading 5', 'eightshift-frontend-libs'), value: 5 },
		{ label: 'H6', tooltip: __('Heading 6', 'eightshift-frontend-libs'), value: 6 },
	];

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'headingUse')}>
			<Section
				showIf={!hideColor || !hideSize || !hideFontWeight || !hideFontWeight}
				additionalClasses='es-h-spaced'
				reducedBottomSpacing={additionalControls}
				noBottomSpacing={typeof additionalControls === 'undefined'}
			>
				{!hideColor &&
					<ColorPicker
						label={(!hideSize && !hideFontWeight) ? null : <IconLabel icon={icons.color} label={__('Color', 'eightshift-frontend-libs')} />}
						colors={getOption('headingColor', attributes, manifest, true)}
						value={headingColor}
						onChange={(value) => setAttributes({ [getAttrKey('headingColor', attributes, manifest)]: value })}
						type='textColor'
						noBottomSpacing
						border
					/>
				}

				{!hideSize &&
					<Select
						value={fontSize}
						options={Object.values(fontSizes)}
						onChange={(value) => setAttributes({
							[getAttrKey('headingSize', attributes, manifest)]: `${value}:${fontSizes[value]?.weights[0] ?? 'bold'}`,
						})}
						additionalSelectClasses='es-w-16'
						placeholder={__('Size', 'eightshift-frontend-libs')}
						noBottomSpacing
						simpleValue
						noSearch
					/>
				}

				{!hideFontWeight && fontSizes[fontSize]?.weightOptions?.length > 0 &&
					<Select
						value={fontWeight}
						options={fontSizes[fontSize]?.weightOptions}
						onChange={(value) => setAttributes({ [getAttrKey('headingSize', attributes, manifest)]: `${fontSize}:${value}` })}
						additionalSelectClasses='es-w-22 es-flex-shrink-0 es-flex-grow-1'
						placeholder={__('Weight', 'eightshift-frontend-libs')}
						noBottomSpacing
						simpleValue
						noSearch
					/>
				}

				{!hideHeadingLevel &&
					<Menu
						icon={<span className='es-text-4.5 es-font-weight-300 es-tabular-nums'>H{headingLevel}</span>}
						tooltip={__('Heading level', 'eightshift-frontend-libs')}
						additionalClass='es-button-square-36 es-is-v2-gutenberg-input-matched-button'
					>
						{headingLevels.map(({ tooltip, value }) => {
							return (
								<MenuItem
									key={value}
									label={tooltip}
									icon={headingLevel === value ? icons.check : icons.dummySpacer}
									onClick={() => setAttributes({ [getAttrKey('headingLevel', attributes, manifest)]: value })}
									additionalClass='es-nested-p-1'
								/>
							);
						})}
					</Menu>
				}
			</Section>

			{additionalControls}
		</UseToggle>
	);
};
