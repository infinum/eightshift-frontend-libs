import React from 'react';
import {
	BlockEditorKeyboardShortcuts,
	BlockEditorProvider,
	BlockList,
	BlockInspector,
	WritingFlow,
	ObserveTyping,
} from '@wordpress/block-editor';
import {
	Popover,
	SlotFillProvider,
	DropZoneProvider,
} from '@wordpress/components';
import '@wordpress/format-library';
import { useState, useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { useSelect, select as globalSelect } from '@wordpress/data';
import { getFullBlockName, getFullBlockNameVariation } from '../editor/register-blocks';

/**
 * Create Inner Blocks.
 *
 * @param {array} innerBlocks Array of inner blocks.
 * @param {boolean} isVariation Check if block is variation type.
 */
const getInnerBlocks = (innerBlocks = [], isVariation = false) => {
	return innerBlocks.map((blockItem) => {

		let blockInner = '';

		if (isVariation) {
			blockInner = createBlock(blockItem[0], blockItem[1], blockItem[2]);
		} else {
			blockInner = createBlock(blockItem.name);
		}

		// Set example attributes for inner block.
		blockInner.attributes = {
			...blockInner.attributes,
			...blockItem.attributes,
		};

		// Run recursive because of multiple nested blocks.
		blockInner.innerBlocks = getInnerBlocks(blockItem.innerBlocks, isVariation);

		return blockInner;
	});
};

/**
 * Combine block details in one object.
 *
 * @param {object} blockManifest Block Manifest data.
 * @param {object} globalManifest Global Blocks Manifest data.
 * @param {boolean} isVariation Check if block is variation type. Default: false.
 */
export const blockDetails = (blockManifest, globalManifest, isVariation = false) => {
	const blockName = getFullBlockName(globalManifest, blockManifest);

	const block = useSelect((select) => {
		return select('core/blocks').getBlockType(blockName);
	});

	let output = {};

	if (isVariation) {

		const variation = useSelect((select) => {
			const variations = select('core/blocks').getBlockTypes();

			const variationItem = variations.filter((element) => element.variations.find((item) => item.name === blockManifest.name));

			return variationItem[0].variations[0];
		});

		output = {
			blockName: getFullBlockNameVariation(globalManifest, blockManifest),
			attributes: variation.example.attributes,
			innerBlocks: getInnerBlocks(variation.example.innerBlocks),
			isVariation,
		};
	} else {
		if (typeof block.example === 'undefined') {
			throw Error(`Your block "${blockName}" is missing example key in manifest.json file. Please check.`);
		}

		if (typeof block.example.attributes === 'undefined') {
			throw Error(`Your block "${blockName}" is missing example attributes key in manifest.json file. Please check.`);
		}

		output = {
			blockName,
			attributes: block.example.attributes,
			innerBlocks: getInnerBlocks(block.example.innerBlocks),
		};
	}

	return output;
};

/**
 * Load actual Block Editor and all the magic.
 *
 * @param {object} props All Props for blocks.
 */
export const Gutenberg = ({ props }) => {
	const {
		blockName,
		attributes,
		innerBlocks,
	} = props;

	// Set default registered blocks.
	const [blocks, updateBlocks] = useState([]);

	useEffect(() => {
		globalSelect('core/blocks').getBlockTypes();

		const block = createBlock(blockName, attributes, innerBlocks);
		blocks.push(block);
	});

	return (
		<div className="playground">
			<SlotFillProvider>
				<DropZoneProvider>
					<BlockEditorProvider
						value={blocks}
						onInput={updateBlocks}
						onChange={updateBlocks}
					>
						<div className="playground__sidebar edit-post-sidebar">
							<BlockInspector />
						</div>
						<div className="editor-styles-wrapper">
							<Popover.Slot name="block-toolbar" />
							<BlockEditorKeyboardShortcuts />
							<WritingFlow>
								<ObserveTyping>
									<BlockList />
								</ObserveTyping>
							</WritingFlow>
						</div>
						<Popover.Slot />
					</BlockEditorProvider>
				</DropZoneProvider>
			</SlotFillProvider>
		</div>
	);
};
