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
import { dispatch } from '@wordpress/data';
import { registerCoreBlocks } from '@wordpress/block-library';

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
 * @param {object} manifest Block Manifest data.
 * @param {object} globalManifest Global Blocks Manifest data.
 * @param {bool} isVariation Check if block is variation type.
 */
export const blockDetails = (manifest, globalManifest, isVariation = false) => {
	const { blockName, parentName } = manifest;
	const { namespace } = globalManifest;

	const block = wp.data.select('core/blocks').getBlockType(`${namespace}/${blockName}`);

	console.log(manifest);

	// if (isVariation) {
	// 	return {
	// 		blockFullName: `${namespace}/${parentName}`,
	// 		attributes: manifest.attributes,
	// 		innerBlocks: manifest.innerBlocks,
	// 		isVariation,
	// 	};
	// }

	return block;
};

/**
 * Load actual Block Editor and all the magic.
 *
 * @param {object} props All Props for blocks.
 */
export const Gutenberg = ({ props }) => {
	const {
		name,
		attributes,
		innerBlocks,
		// isVariation,
	} = props;

	// Set default registered blocks.
	const [blocks, updateBlocks] = useState([]);

	useEffect(() => {
		const block = createBlock(name, attributes, innerBlocks);
		blocks.push(block);
	}, []);

	console.log(blocks);

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
