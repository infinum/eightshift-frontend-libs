import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { HeadingOptions as HeadingOptionsComponent } from '../../../components/heading/components/heading-options';

export const HeadingOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Heading Details', 'eightshift-frontend-libs')}>

			<HeadingOptionsComponent
				{...attributes}
				setAttributes={setAttributes}
			/>

		</PanelBody>
	);
};
