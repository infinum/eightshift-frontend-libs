import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts/editor';
import { ButtonEditor as ButtonEditorComponent } from '../../../components/button/components/button-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ButtonEditor = ({ attributes, setAttributes }) => {
	const unique = useMemo(() => getUnique(), []);
	const {
		blockName,
	} = manifest;

	const {
		blockClass,
	} = attributes;

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<div className={blockClass} data-id={unique}>
				<ButtonEditorComponent
					setAttributes={setAttributes}
					{...props(attributes, blockName, '', true)}
				/>
			</div>
		</>
	);
};
