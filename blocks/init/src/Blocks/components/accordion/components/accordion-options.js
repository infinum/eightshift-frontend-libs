import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const AccordionOptions = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = __('Accordion', 'eightshift-frontend-libs'),
		accordionShowControls = true,

		accordionUse = checkAttr('accordionUse', attributes, manifest, componentName),

		accordionIsOpen = checkAttr('accordionIsOpen', attributes, manifest, componentName),

		showAccordionIsOpen = true,
	} = attributes;

	if (!accordionShowControls) {
		return null;
	}

	return (
		<Fragment>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			<ToggleControl
				label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
				checked={accordionUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{showAccordionIsOpen &&
				<Fragment>
					<ToggleControl
						label={__('Is Open', 'eightshift-frontend-libs')}
						checked={accordionIsOpen}
						onChange={(value) => setAttributes({ [`${componentName}IsOpen`]: value })}
					/>
				</Fragment>
			}

		</Fragment>
	);
};
