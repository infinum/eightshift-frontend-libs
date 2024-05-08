import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts';
import { ListsOptions as ListsOptionsComponent } from '../../../components/lists/components/lists-options';

export const ListsOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('List', '%g_textdomain%')}>
			<ListsOptionsComponent
				{...props('lists', attributes, {
					setAttributes,
				})}
				noExpandButton
				noUseToggle
				noLabel
			/>
		</PanelBody>
	);
};
