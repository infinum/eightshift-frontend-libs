import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { HeadingOptions as HeadingOptionsComponent } from '../../../components/heading/components/heading-options';

export const HeadingOptions = ({ attributes, actions }) => {
	const {
		heading,
	} = attributes;

	const {
		onChangeHeadingStyleSize,
		onChangeHeadingStyleColor,
	} = actions;

	const headingObject = (typeof heading === 'undefined') || heading;

	return (
		<PanelBody title={__('Heading Details', 'eightshift-boilerplate')}>

			<HeadingOptionsComponent
				heading={headingObject}
				onChangeStyleColor={onChangeHeadingStyleColor}
				onChangeStyleSize={onChangeHeadingStyleSize}
			/>

		</PanelBody>
	);
};
