import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { LinkOptions as LinkOptionsComponent } from '../../../components/link/components/link-options';

export const LinkOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Link Details', 'eightshift-frontend-libs')}>
			<LinkOptionsComponent
				{...attributes}
				setAttributes={setAttributes}
			/>
		</PanelBody>
	);
};
