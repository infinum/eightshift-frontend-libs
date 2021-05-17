import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts/editor';
import { ListsEditor as ListsEditorComponent } from '../../../components/lists/components/lists-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ListsEditor = ({ attributes, setAttributes }) => {
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
				<ListsEditorComponent
					{...props(attributes, blockName, '', true)}
					setAttributes={setAttributes}
				/>
			</div>
		</>
	);
};
