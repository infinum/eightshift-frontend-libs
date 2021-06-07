import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { JumbotronEditor as JumbotronEditorComponent } from '../../../components/jumbotron/components/jumbotron-editor';
import manifest from './../manifest.json';

export const JumbotronEditor = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
	} = manifest;

	return (
		<JumbotronEditorComponent
			{...props(attributes, manifestBlockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
