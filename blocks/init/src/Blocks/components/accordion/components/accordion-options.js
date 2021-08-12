import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, ComponentUseToggle, getAttrKey, icons, IconToggle } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const AccordionOptions = (attributes) => {
	const {
		setAttributes,
		label = __('Accordion', 'eightshift-frontend-libs'),
		accordionShowControls = true,

		showAccordionUse = false,
		showLabel = false,
		showAccordionIsOpen = true,
	} = attributes;

	if (!accordionShowControls) {
		return null;
	}

	const accordionUse = checkAttr('accordionUse', attributes, manifest);
	const accordionIsOpen = checkAttr('accordionIsOpen', attributes, manifest);
	const accordionCloseOthers = checkAttr('accordionCloseOthers', attributes, manifest);

	return (
		<>
			<ComponentUseToggle
				label={label}
				checked={accordionUse}
				onChange={(value) => setAttributes({ [getAttrKey('accordionUse', attributes, manifest)]: value })}
				showUseToggle={showAccordionUse}
				showLabel={showLabel}
			/>

			{showAccordionIsOpen &&
				<IconToggle
					icon={icons.play}
					label={__('Start open', 'eightshift-frontend-libs')}
					checked={accordionIsOpen}
					onChange={(value) => setAttributes({ [getAttrKey('accordionIsOpen', attributes, manifest)]: value })}
				/>
			}

			{showAccordionIsOpen &&
				<IconToggle
					icon={icons.errorCircle}
					label={__('Close adjacent', 'eightshift-frontend-libs')}
					help={__('Close adjacent accordions when opening this one.', 'eightshift-frontend-libs')}
					checked={accordionCloseOthers}
					onChange={(value) => setAttributes({ [getAttrKey('accordionCloseOthers', attributes, manifest)]: value })}
				/>
			}
		</>
	);
};
