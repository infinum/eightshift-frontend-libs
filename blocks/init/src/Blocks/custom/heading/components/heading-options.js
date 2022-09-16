import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { checkAttr, getAttrKey, getOption, props, SimpleHorizontalSingleSelect } from '@eightshift/frontend-libs/scripts';
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
				showHeadingUse={false}
				showLabel={false}
				showExpanderButton={false}
				additionalControlsSplitArea={
					<SimpleHorizontalSingleSelect
						value={headingAlign}
						options={getOption('headingAlign', attributes, manifest)}
						label={__('Text align', 'eightshift-frontend-libs')}
						onChange={(value) => setAttributes({ [getAttrKey('headingAlign', attributes, manifest)]: value })}
						border='offset'
						iconOnly
					/>
				}
			/>
		</PanelBody>
	);
};
