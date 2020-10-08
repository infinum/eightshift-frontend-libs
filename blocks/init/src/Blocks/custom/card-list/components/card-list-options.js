import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ButtonOptions } from '../../../components/button/components/button-options';

export const cardListMediaPosition = [
	{ label: __('Left', 'eightshift-boilerplate'), value: 'left' },
	{ label: __('Right', 'eightshift-boilerplate'), value: 'right' },
];

export const CardListOptions = ({ attributes, actions }) => {
	return (
		<PanelBody title={__('Card List Details', 'eightshift-boilerplate')}>

			<ButtonOptions
				{...attributes}
				{...actions}
			/>

		</PanelBody>
	);
};
