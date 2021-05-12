import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts/editor';
import { ParagraphEditor as ParagraphEditorComponent } from '../../../components/paragraph/components/paragraph-editor';
import { createBlock } from '@wordpress/blocks';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ParagraphEditor = ({ attributes, setAttributes, onReplace, mergeBlocks }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		blockName,
	} = manifest;

	const {
		namespace,
	} = globalManifest;

	const {
		blockClass,
	} = attributes;

	const propsObject = props(attributes, blockName, '', true);

	/**
	 * Block-splitting logic. If content is available, creates
	 * a new block with the attributes of the original.
	 *
	 * @param {*} value Content value.
	 */
	const splitBlocks = (value) => {
		if (!value) {
			return createBlock(`${namespace}/${blockName}`);
		}

		return createBlock(`${namespace}/${blockName}`, {
			...propsObject,
			[`${blockName}Content`]: value,
		});
	};

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<div className={blockClass} data-id={unique}>
				<ParagraphEditorComponent
					{...propsObject}
					setAttributes={setAttributes}
					onSplit={splitBlocks}
					mergeBlocks={mergeBlocks}
					onReplace={onReplace}
					onRemove={onReplace ? () => onReplace([]) : undefined}
				/>
			</div>
		</>
	);
};
