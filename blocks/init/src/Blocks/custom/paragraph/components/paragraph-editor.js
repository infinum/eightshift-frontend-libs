import React, { useMemo } from 'react';
import { createBlock } from '@wordpress/blocks';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts';
import { ParagraphEditor as ParagraphEditorComponent } from '../../../components/paragraph/components/paragraph-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ParagraphEditor = (keyProps) => {

	const { attributes, setAttributes, onReplace, mergeBlocks } = keyProps;

	const {
		blockFullName,
		uniqueWrapperId,
	} = attributes;

	const unique = uniqueWrapperId ?? useMemo(() => getUnique(), []);

	const propsObject = props('paragraph', attributes);

	/**
	 * Block-splitting logic. If content is available, creates
	 * a new block with the attributes of the original.
	 *
	 * @param {*} value Content value.
	 */
	const splitBlocks = (value) => {
		if (!value) {
			return createBlock(blockFullName);
		}

		return createBlock(blockFullName, {
			...propsObject,
			[`${propsObject.prefix}Content`]: value,
		});
	};

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<ParagraphEditorComponent
				{...propsObject}
				setAttributes={setAttributes}
				onSplit={splitBlocks}
				mergeBlocks={mergeBlocks}
				onReplace={onReplace}
				onRemove={onReplace ? () => onReplace([]) : undefined}
			/>
		</>
	);
};
