import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts';
import { QuoteEditor as QuoteEditorComponent } from '../../../components/quote/components/quote-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const QuoteEditor = ({ attributes, setAttributes }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<QuoteEditorComponent
				{...props('quote', attributes, {
					setAttributes: setAttributes,
				})}
			/>
		</div>
	);
};
