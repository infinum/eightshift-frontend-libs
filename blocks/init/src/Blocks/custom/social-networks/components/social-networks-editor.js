import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts';
import { SocialNetworksEditor as EditorComponent } from '../../../components/social-networks/components/social-networks-editor';

export const SocialNetworksEditor = ({ attributes, setAttributes }) => {
	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass}>
			<EditorComponent
				{...props('socialNetworks', attributes, { setAttributes })}
			/>
		</div>
	);
};
