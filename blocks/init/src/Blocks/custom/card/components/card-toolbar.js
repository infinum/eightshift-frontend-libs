import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { CardToolbar as CardToolbarComponent } from '../../../components/card/components/card-toolbar';
import manifest from './../manifest.json';

export const CardToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
		options: manifestOptions,
	} = manifest;

	return (
		<CardToolbarComponent
			{...props(attributes, manifestBlockName, '', true)}
			setAttributes={setAttributes}
			options={manifestOptions}
		/>
	);
};
