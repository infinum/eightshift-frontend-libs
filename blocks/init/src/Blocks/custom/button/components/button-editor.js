import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts';
import { ButtonEditor as ButtonEditorComponent } from '../../../components/button/components/button-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ButtonEditor = ({ attributes, setAttributes }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<ButtonEditorComponent
				{...props('button', attributes, {
					setAttributes,
				})}
			/>
		</div>
	);
};
