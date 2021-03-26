import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { HeadingToolbar as HeadingToolbarComponent } from '../../../components/heading/components/heading-toolbar';
import manifest from './../manifest.json';

export const HeadingToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<HeadingToolbarComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
