import React from 'react';
import { __ } from '@wordpress/i18n';
import { getAttrKey, checkAttr, getOption, UseToggle, OptionSelector, generateUseToggleConfig, NumberPicker } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const LayoutOptions = (attributes) => {
	const {
		combinations,
	} = manifest;

	const {
		setAttributes,

		hideType = false,
		hideMaxItems = false,
	} = attributes;

	const layoutType = checkAttr('layoutType', attributes, manifest);
	const layoutTotalItems = checkAttr('layoutTotalItems', attributes, manifest);

	const layouts = getOption('layoutType', attributes, manifest);

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'layoutUse')}>
			{!hideType &&
				<OptionSelector
					onChange={(value) => setAttributes({
						[getAttrKey('layoutType', attributes, manifest)]: value,
						[getAttrKey('layoutTotalItems', attributes, manifest)]: combinations.layoutType[value].layoutTotalItems,
					})}
					value={layoutType}
					options={layouts}
					additionalClass='es-mb-3'
					// eslint-disable-next-line max-len
					additionalButtonClass='es-v-spaced es-content-center! es-nested-m-0! es-h-16 es-w-16 es-nested-flex-shrink-0 es-text-3 es-gap-1.25! es-line-h-1'
					noBottomSpacing
				/>
			}

			{!hideMaxItems &&
				<NumberPicker
					{...getOption('layoutTotalItems', attributes, manifest)}
					label={__('Maximum number of items', 'eightshift-frontend-libs')}
					value={layoutTotalItems}
					onChange={(value) => setAttributes({ [getAttrKey('layoutTotalItems', attributes, manifest)]: value })}
					isDragEnabled
					noBottomSpacing
					inlineLabel
				/>
			}
		</UseToggle>
	);
};
