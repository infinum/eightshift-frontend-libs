import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ButtonEditor as ButtonEditorComponent } from '../../../components/button/components/button-editor';
import manifest from './../manifest.json';

export const ButtonEditor = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<ButtonEditorComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
