import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { LinkEditor as LinkEditorComponent } from '../../../components/link/components/link-editor';
import manifest from './../manifest.json';

export const LinkEditor = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<LinkEditorComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
