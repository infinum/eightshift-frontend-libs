import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { checkAttr, getAttrKey, getOption, props, OptionSelector } from '@eightshift/frontend-libs/scripts';
import { HeadingOptions as HeadingOptionsComponent } from '../../../components/heading/components/heading-options';
import manifest from '../manifest.json';

export const HeadingOptions = ({ attributes, setAttributes }) => {
	const headingAlign = checkAttr('headingAlign', attributes, manifest);

	return (
		<PanelBody title={__('Heading', 'eightshift-frontend-libs')}>
			<HeadingOptionsComponent
				{...props('heading', attributes, {
					setAttributes,
				})}
				additionalControlsBeforeHeadingLevel={
					<OptionSelector
						value={headingAlign}
						options={getOption('headingAlign', attributes, manifest)}
						onChange={(value) => setAttributes({ [getAttrKey('headingAlign', attributes, manifest)]: value })}
						iconOnly
					/>
				}
				noExpandButton
				noUseToggle
				noLabel
			/>
		</PanelBody>
	);
};
