import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { LinkToolbar as LinkToolbarComponent } from '../../../components/link/components/link-toolbar';
import manifest from './../manifest.json';

export const LinkToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<LinkToolbarComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
