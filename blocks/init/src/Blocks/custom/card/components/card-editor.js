import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { CardEditor as CardEditorComponent } from '../../../components/card/components/card-editor';
import manifest from './../manifest.json';

export const CardEditor = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<CardEditorComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
