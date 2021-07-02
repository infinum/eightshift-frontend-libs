import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ListsOptions as ListsOptionsComponent } from '../../../components/lists/components/lists-options';

export const ListsOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Lists Details', 'eightshift-frontend-libs')}>

			<ListsOptionsComponent
				{...props(attributes, 'lists')}
				setAttributes={setAttributes}
			/>

		</PanelBody>
	);
};
