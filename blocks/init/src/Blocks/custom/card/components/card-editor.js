import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts';
import { CardEditor as CardEditorComponent } from '../../../components/card/components/card-editor';

export const CardEditor = ({ attributes, setAttributes }) => {
	return (
		<CardEditorComponent
			{...props('card', attributes, {
				setAttributes,
			})}
		/>
	);
};
