import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const AccordionOptions = (attributes) => {
	const {
		componentName: manifestComponentName,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = __('Accordion', 'eightshift-frontend-libs'),
		accordionShowControls = true,

		accordionUse = checkAttr('accordionUse', attributes, manifest),

		accordionIsOpen = checkAttr('accordionIsOpen', attributes, manifest),

		showAccordionUse = true,
		showAccordionIsOpen = true,
	} = attributes;

	if (!accordionShowControls) {
		return null;
	}

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
					onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
				/>
			}

			{showAccordionIsOpen &&
				<>
					<ToggleControl
						label={__('Is Open', 'eightshift-frontend-libs')}
						checked={accordionIsOpen}
						onChange={(value) => setAttributes({ [`${componentName}IsOpen`]: value })}
					/>
				</>
			}
		</>
	);
};
