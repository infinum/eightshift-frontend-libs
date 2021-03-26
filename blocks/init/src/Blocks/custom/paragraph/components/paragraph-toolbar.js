import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ParagraphToolbar as ParagraphToolbarComponent } from '../../../components/paragraph/components/paragraph-toolbar';
import manifest from './../manifest.json';

export const ParagraphToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<ParagraphToolbarComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
