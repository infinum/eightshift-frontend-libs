import React from 'react';
import { ParagraphEditor as ParagraphEditorComponent } from '../../../components/paragraph/components/paragraph-editor';
import { createBlock } from '@wordpress/blocks';
import manifest from './../manifest.json';

export const ParagraphEditor = ({ attributes, setAttributes, onReplace, mergeBlocks }) => {
	const blockName = manifest.blockName;

	/**
	 * Block-splitting logic. If content is available, creates
	 * a new block with the attribtues of the original.
	 *
	 * @param {*} value Content value.
	 */
	const splitBlocks = (value) => {
		if (!value) {
			return createBlock(`eightshift-boilerplate/${blockName}`);
		}

		return createBlock(`eightshift-boilerplate/${blockName}`, {
			...attributes,
			[`${blockName}Content`]: value,
		});
	};

	return (
		<ParagraphEditorComponent
			{...attributes}
			setAttributes={setAttributes}
			onSplit={splitBlocks}
			mergeBlocks={mergeBlocks}
			onReplace={onReplace}
			onRemove={onReplace ? () => onReplace([]) : undefined}
		/>
	);
};
