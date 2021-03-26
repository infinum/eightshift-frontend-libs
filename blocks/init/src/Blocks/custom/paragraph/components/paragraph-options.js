import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ParagraphOptions as ParagraphOptionsComponent } from '../../../components/paragraph/components/paragraph-options';
import manifest from './../manifest.json';

export const ParagraphOptions = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<PanelBody title={__('Paragraph Details', 'eightshift-frontend-libs')}>

			<ParagraphOptionsComponent
				{...props(attributes, blockName, '', true)}
				setAttributes={setAttributes}
			/>

		</PanelBody>
	);
};
