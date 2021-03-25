import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { HeadingOptions as HeadingOptionsComponent } from '../../../components/heading/components/heading-options';
import manifest from './../manifest.json';

export const HeadingOptions = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<PanelBody title={__('Heading Details', 'eightshift-frontend-libs')}>

			<HeadingOptionsComponent
				{...props(attributes, blockName, '', true)}
				setAttributes={setAttributes}
			/>

		</PanelBody>
	);
};
