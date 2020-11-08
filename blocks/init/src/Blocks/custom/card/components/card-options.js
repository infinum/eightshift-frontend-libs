import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { CardOptions as CardOptionsComponent } from '../../../components/card/components/card-options';

export const CardOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Card Details', 'solplanet')}>
			<CardOptionsComponent
				{...attributes}
				setAttributes={setAttributes}
			/>
		</PanelBody>
	);
};
