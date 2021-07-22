import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const AccordionOptions = (attributes) => {
	const {
		setAttributes,
		label = __('Accordion', 'eightshift-frontend-libs'),
		accordionShowControls = true,

		showAccordionUse = true,
		showAccordionIsOpen = true,
	} = attributes;

	if (!accordionShowControls) {
		return null;
	}

	const accordionUse = checkAttr('accordionUse', attributes, manifest);
	const accordionIsOpen = checkAttr('accordionIsOpen', attributes, manifest);

	return (
		<>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{showAccordionUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
					checked={accordionUse}
					onChange={(value) => setAttributes({ [getAttrKey('accordionUse', attributes, manifest)]: value })}
				/>
			}

			{showAccordionIsOpen &&
				<>
					<ToggleControl
						label={__('Is Open', 'eightshift-frontend-libs')}
						checked={accordionIsOpen}
						onChange={(value) => setAttributes({ [getAttrKey('accordionIsOpen', attributes, manifest)]: value })}
					/>
				</>
			}
		</>
	);
};
