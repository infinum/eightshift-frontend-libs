import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { LinkOptions as LinkOptionsComponent } from '../../../components/link/components/link-options';

export const LinkOptions = ({ attributes, actions }) => {
	return (
		<PanelBody title={__('Link Details', 'eightshift-boilerplate')}>

			<LinkOptionsComponent
				{...attributes}
				{...actions}
			/>

		</PanelBody>
	);
};
