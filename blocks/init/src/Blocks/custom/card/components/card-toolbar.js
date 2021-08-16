import React from 'react';
import { props, getOptions } from '@eightshift/frontend-libs/scripts';
import { CardToolbar as CardToolbarComponent } from '../../../components/card/components/card-toolbar';
import manifest from './../manifest.json';

export const CardToolbar = ({ attributes, setAttributes }) => {
	return (
		<CardToolbarComponent
			{...props('card', attributes, {
				setAttributes: setAttributes,
				options: getOptions(attributes, manifest),
			})}
		/>
	);
};
