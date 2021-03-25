import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ListsOptions as ListsOptionsComponent } from '../../../components/lists/components/lists-options';
import manifest from './../manifest.json';

export const ListsOptions = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<PanelBody title={__('Lists Details', 'eightshift-frontend-libs')}>
			<ListsOptionsComponent
				{...props(attributes, blockName, '', true)}
				setAttributes={setAttributes}
			/>
		</PanelBody>
	);
};
