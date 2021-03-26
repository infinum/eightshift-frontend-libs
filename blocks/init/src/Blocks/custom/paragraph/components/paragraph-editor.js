import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ParagraphEditor as ParagraphEditorComponent } from '../../../components/paragraph/components/paragraph-editor';
import { createBlock } from '@wordpress/blocks';
import globalSettings from '../../../manifest.json';
import manifest from './../manifest.json';

export const ParagraphEditor = ({ attributes, setAttributes, onReplace, mergeBlocks }) => {
	const {
		blockName,
	} = manifest;

	const {
		namespace,
	} = globalSettings;

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
		<ParagraphEditorComponent
			{...propsObject}
			setAttributes={setAttributes}
			onSplit={splitBlocks}
			mergeBlocks={mergeBlocks}
			onReplace={onReplace}
			onRemove={onReplace ? () => onReplace([]) : undefined}
		/>
	);
};
