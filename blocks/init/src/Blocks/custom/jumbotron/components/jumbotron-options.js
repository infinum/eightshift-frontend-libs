import React from 'react';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { JumbotronOptions as JumbotronOptionsComponent } from '../../../components/jumbotron/components/jumbotron-options';

export const JumbotronOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Jumbotron Details', 'eightshift-frontend-libs')}>
			<JumbotronOptionsComponent
				{...attributes}
				setAttributes={setAttributes}
			/>
		</PanelBody>
	);
};
