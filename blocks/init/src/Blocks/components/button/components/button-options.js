import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { icons, getOption, checkAttr, getAttrKey, IconLabel, CollapsableComponentUseToggle, LinkEditComponent, SimpleHorizontalSingleSelect, FancyDivider, props, getOptions } from '@eightshift/frontend-libs/scripts';
import { IconOptions } from '../../icon/components/icon-options';
import manifest from './../manifest.json';

export const ButtonOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		buttonShowControls = true,

		showButtonUse = true,
		showLabel = true,
		showButtonAriaLabel = true,
		showButtonId = true,
		showButtonUrl = true,
		showButtonVariant = true,

		showExpanderButton = true,

		additionalControls,
		additionalControlsSplitArea,
	} = attributes;

	if (!buttonShowControls) {
		return null;
	}

	const buttonUse = checkAttr('buttonUse', attributes, manifest);
	const buttonId = checkAttr('buttonId', attributes, manifest);
	const buttonAriaLabel = checkAttr('buttonAriaLabel', attributes, manifest);
	const buttonUrl = checkAttr('buttonUrl', attributes, manifest);
	const buttonIsNewTab = checkAttr('buttonIsNewTab', attributes, manifest);
	const buttonVariant = checkAttr('buttonVariant', attributes, manifest);

	return (
		<CollapsableComponentUseToggle
			label={label}
			checked={buttonUse}
			onChange={(value) => setAttributes({ [getAttrKey('buttonUse', attributes, manifest)]: value })}
			showUseToggle={showButtonUse}
			showLabel={showLabel}
			showExpanderButton={showExpanderButton}
		>
			{showButtonUrl &&
				<LinkEditComponent
					url={buttonUrl}
					opensInNewTab={buttonIsNewTab}
					setAttributes={setAttributes}
					urlAttrName={getAttrKey('buttonUrl', attributes, manifest)}
					isNewTabAttrName={getAttrKey('buttonIsNewTab', attributes, manifest)}
					hasUrlPreview
					icon={icons.globe}
					label={(!showLabel && !showButtonUse) || (showLabel && showButtonUse) ? __('URL', 'eightshift-frontend-libs') : sprintf(__('%s URL'), label)}
					additionalClass='es-mb-0-bcf! es-mb-2!'
				/>
			}

			{(showButtonVariant || additionalControlsSplitArea) &&
				<div className={additionalControlsSplitArea ? 'es-fifty-fifty-h-wrap' : ''}>
					{showButtonVariant &&
						<SimpleHorizontalSingleSelect
							label={additionalControlsSplitArea ? __('Type', 'eightshift-frontend-libs') : null}
							inlineLabel={!additionalControlsSplitArea ? __('Type', 'eightshift-frontend-libs') : null}
							value={buttonVariant}
							onChange={(value) => setAttributes({
								[getAttrKey('buttonVariant', attributes, manifest)]: value,
							})}
							options={getOption('buttonVariant', attributes, manifest)}
							additionalClass={additionalControlsSplitArea ? '' : 'es-my-4!'}
							border='offset'
							iconOnly
						/>
					}

					{additionalControlsSplitArea}
				</div>
			}

			{additionalControls}

			<IconOptions
				{...props('icon', attributes, {
					options: getOptions(attributes, manifest),
				})}
				showIconSize={false}
			/>

			{showButtonAriaLabel &&
				<FancyDivider label={<IconLabel icon={icons.a11y} label={__('Accessibility', 'eightshift-frontend-libs')} />} additionalClasses='es-mt-0 es-mb-2.5' />
			}

			{showButtonAriaLabel &&
				<TextControl
					label={<IconLabel icon={icons.ariaLabel} label={__('ARIA label', 'eightshift-frontend-libs')} />}
					value={buttonAriaLabel}
					onChange={(value) => setAttributes({ [getAttrKey('buttonAriaLabel', attributes, manifest)]: value })}
					help={__('Description of the button.', 'eightshift-frontend-libs')}
				/>
			}

			{showButtonId &&
				<FancyDivider label={<IconLabel icon={icons.tools} label={__('Advanced', 'eightshift-frontend-libs')} />} additionalClasses='es-mt-0 es-mb-2.5' />
			}

			{showButtonId &&
				<TextControl
					label={<IconLabel icon={icons.id} label={__('Unique identifier', 'eightshift-frontend-libs')} />}
					value={buttonId}
					onChange={(value) => setAttributes({ [getAttrKey('buttonId', attributes, manifest)]: value })}
				/>
			}
		</CollapsableComponentUseToggle>
	);
};
