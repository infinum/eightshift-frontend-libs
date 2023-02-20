import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { checkAttr, getAttrKey, icons, IconToggle } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const AccordionItemOptions = ({ attributes, setAttributes }) => {
	const accordionItemStartOpen = checkAttr('accordionItemStartOpen', attributes, manifest);

	return (
		<PanelBody title={__('Accordion item', 'eightshift-frontend-libs')}>
			<IconToggle
				icon={icons.dropdownClose}
				label={__('Expanded', 'eightshift-frontend-libs')}
				checked={accordionItemStartOpen}
				onChange={(value) => setAttributes({ [getAttrKey('accordionItemStartOpen', attributes, manifest)]: value })}
				noBottomSpacing
			/>
		</PanelBody>
	);
};
