import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts';
import { HeadingEditor as HeadingEditorComponent } from '../../../components/heading/components/heading-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const HeadingEditor = ({ attributes, setAttributes }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<HeadingEditorComponent
				{...props('heading', attributes, {
					setAttributes,
				})}
			/>
		</div>
	);
};
