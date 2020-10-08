import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { HeadingOptions as HeadingOptionsComponent } from '../../../components/heading/components/heading-options';

export const HeadingOptions = ({ attributes, actions }) => {
	return (
		<PanelBody title={__('Heading Details', 'eightshift-boilerplate')}>

			<HeadingOptionsComponent
				{...attributes}
				{...actions}
			/>

		</PanelBody>
	);
};
