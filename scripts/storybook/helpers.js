import React from 'react'; // eslint-disable-line no-unused-vars
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
import { select } from '@wordpress/data';
import { getFullBlockName, getNamespace } from './../editor/register-blocks';

/**
 * Create Inner Blocks.
 *
 * @param {array} innerBlocks Array of inner blocks.
 * @param {bool} isVariation Check if block is variation type.
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
 * @param {bool} isVariation Check if block is variation type. Default: false.
 */
export const blockDetails = (blockManifest, globalManifest, isVariation = false) => {
	if (isVariation) {
		const variations = select('core/blocks').getBlockVariations();

		const variation = variations.filter((item) => item.name === blockManifest.name)[0];

		const variationName = `${getNamespace(globalManifest, blockManifest)}/${variation.name}`;

		if (typeof variation.example === 'undefined') {
			throw Error(`Your variation "${variationName}" is missing example key in manifest.json file. Please check.`);
		}

		if (typeof variation.example.attributes === 'undefined') {
			throw Error(`Your variation "${variationName}" is missing example attributes key in manifest.json file. Please check.`);
		}

		return {
			blockName: `${getNamespace(globalManifest, blockManifest)}/${variation.parentName}`,
			attributes: variation.example.attributes,
			isVariation,
		};
	}

	const blockName = getFullBlockName(globalManifest, blockManifest);
	const block = select('core/blocks').getBlockType(blockName);

	if (typeof block.example === 'undefined') {
		throw Error(`Your block "${blockName}" is missing example key in manifest.json file. Please check.`);
	}

	if (typeof block.example.attributes === 'undefined') {
		throw Error(`Your block "${blockName}" is missing example attributes key in manifest.json file. Please check.`);
	}

	return {
		blockName,
		attributes: block.example.attributes,
	};
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
	} = props;

	// Set default registered blocks.
	const [blocks, updateBlocks] = useState([]);

	useEffect(() => {
		select('core/blocks').getBlockTypes();

		const block = createBlock(blockName, attributes, []);
		blocks.push(block);
	}, []);

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
