import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const AccordionOptions = (attributes) => {
	const {
		setAttributes,
		label = __('Accordion', 'eightshift-boilerplate'),
		showControls = true,

		accordionUse = defaults.accordionUse,

		accordionIsOpen = defaults.accordionIsOpen.default,

		showAccordionIsOpen = true,
	} = attributes;

	if (!showControls) {
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
				label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
				checked={accordionUse}
				onChange={(value) => setAttributes({ accordionUse: value })}
			/>

			{showAccordionIsOpen &&
				<Fragment>
					<ToggleControl
						label={__('Is Open', 'eightshift-boilerplate')}
						checked={accordionIsOpen}
						onChange={(value) => setAttributes({ accordionIsOpen: value })}
					/>
				</Fragment>
			}

		</Fragment>
	);
};
