import React from 'react';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { icons, getOption, checkAttr, getAttrKey, IconLabel, UseToggle, LinkEditComponent, OptionSelector, props, getOptions, Section, generateUseToggleConfig } from '@eightshift/frontend-libs/scripts';
import { IconOptions } from '../../icon/components/icon-options';
import manifest from './../manifest.json';

export const ButtonOptions = (attributes) => {
	const {
		setAttributes,

		hideAriaLabel = false,
		hideId = false,
		hideUrl = false,
		hideVariantPicker = false,

		additionalControls,
		additionalControlsSplitArea,
	} = attributes;

	const buttonId = checkAttr('buttonId', attributes, manifest);
	const buttonAriaLabel = checkAttr('buttonAriaLabel', attributes, manifest);
	const buttonUrl = checkAttr('buttonUrl', attributes, manifest);
	const buttonIsNewTab = checkAttr('buttonIsNewTab', attributes, manifest);
	const buttonVariant = checkAttr('buttonVariant', attributes, manifest);

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'buttonUse')}>
			{!hideUrl &&
				<LinkEditComponent
					url={buttonUrl}
					opensInNewTab={buttonIsNewTab}
					onChange={({ url, newTab, isAnchor }) => setAttributes({
						[getAttrKey('buttonUrl', attributes, manifest)]: url,
						[getAttrKey('buttonIsNewTab', attributes, manifest)]: newTab,
						[getAttrKey('buttonIsAnchor', attributes, manifest)]: isAnchor ?? false,
					})}
				/>
			}

			{!hideVariantPicker &&
				<OptionSelector
					label={<IconLabel icon={icons.genericShapesAlt} label={__('Type', 'eightshift-frontend-libs')} standalone />}
					value={buttonVariant}
					onChange={(value) => setAttributes({ [getAttrKey('buttonVariant', attributes, manifest)]: value })}
					options={getOption('buttonVariant', attributes, manifest)}
					additionalButtonClass='es-v-spaced es-content-center! es-nested-m-0! es-h-16 es-w-16 es-nested-flex-shrink-0 es-text-3 es-gap-0.1!'
				/>
			}

			{additionalControlsSplitArea}

			{additionalControls}

			<IconOptions
				{...props('icon', attributes, {
					options: getOptions(attributes, manifest),
				})}
				noExpandButton
			/>

			<Section showIf={!hideAriaLabel} icon={icons.a11y} label={__('Accessibility', 'eightshift-frontend-libs')} collapsable reducedBottomSpacing>
				<TextControl
					label={<IconLabel icon={icons.ariaLabel} label={__('ARIA label', 'eightshift-frontend-libs')} />}
					value={buttonAriaLabel}
					onChange={(value) => setAttributes({ [getAttrKey('buttonAriaLabel', attributes, manifest)]: value })}
					help={__('Description of the button.', 'eightshift-frontend-libs')}
				/>
			</Section>

			<Section showIf={!hideId} icon={icons.tools} label={__('Advanced', 'eightshift-frontend-libs')} collapsable noBottomSpacing>
				<TextControl
					label={<IconLabel icon={icons.id} label={__('Unique identifier', 'eightshift-frontend-libs')} />}
					value={buttonId}
					onChange={(value) => setAttributes({ [getAttrKey('buttonId', attributes, manifest)]: value })}
				/>
			</Section>
		</UseToggle>
	);
};
