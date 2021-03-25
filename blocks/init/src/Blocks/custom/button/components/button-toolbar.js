import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ButtonToolbar as ButtonToolbarComponent } from '../../../components/button/components/button-toolbar';
import manifest from './../manifest.json';

export const ButtonToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<ButtonToolbarComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
