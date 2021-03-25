import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { HeadingEditor as HeadingEditorComponent } from '../../../components/heading/components/heading-editor';
import manifest from './../manifest.json';

export const HeadingEditor = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<HeadingEditorComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
