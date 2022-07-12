import React from 'react';
import {
	BlockEditorKeyboardShortcuts,
	BlockEditorProvider,
	BlockList,
	BlockTools,
	BlockInspector,
	WritingFlow,
	ObserveTyping,
} from '@wordpress/block-editor';
import { Popover, SlotFillProvider } from '@wordpress/components';
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';
import '@wordpress/format-library';
import { useState, useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { select as globalSelect } from '@wordpress/data';
import { getFullBlockName, getFullBlockNameVariation } from '../editor/registration';

/**
 * Combine block details in one object.
 *
 * @param {object} blockManifest        - Block Manifest data.
 * @param {object} globalManifest       - Global Blocks Manifest data.
 * @param {boolean} [isVariation=false] - Check if block is variation type. Default: false.
 *
 * @access public
 *
 * @returns {object}
 *
 * Usage:
 * ```js
 * <Gutenberg props={blockDetails(manifest, globalManifest)} />
 * ```
 */
export const blockDetails = (blockManifest, globalManifest, isVariation = false) => {
	const blockName = getFullBlockName(globalManifest, blockManifest);

	if (isVariation) {
		return {
			blockName: getFullBlockNameVariation(globalManifest, blockManifest),
			attributes: blockManifest?.example?.attributes ?? blockManifest?.attributes,
			innerBlocks: getInnerBlocks(blockManifest?.example?.innerBlocks ?? blockManifest?.innerBlocks),
			isVariation,
		};
	}

	return {
		blockName,
		attributes: blockManifest?.example?.attributes,
		innerBlocks: getInnerBlocks(blockManifest?.example?.innerBlocks),
	};
};

/**
 * Load actual Block Editor and all the magic.
 *
 * @access public
 *
 * @param {object} props - All Props for blocks.
 *
 * @returns {component}
 *
 * Usage:
 * ```js
 * <Gutenberg props={blockDetails(manifest, globalManifest)} />
 * ```
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
			<ShortcutProvider>
				<SlotFillProvider>
					<BlockEditorProvider
						value={blocks}
						onInput={updateBlocks}
						onChange={updateBlocks}
					>
						<div className="playground__sidebar">
							<BlockInspector />
						</div>
						<div className="playground__content">
							<BlockTools>
								<div className="editor-styles-wrapper">
									<BlockEditorKeyboardShortcuts.Register />
									<WritingFlow>
										<ObserveTyping>
											<BlockList />
										</ObserveTyping>
									</WritingFlow>
								</div>
							</BlockTools>
						</div>
						<Popover.Slot />
					</BlockEditorProvider>
				</SlotFillProvider>
			</ShortcutProvider>
		</div>
	);
};

/**
 * Create Inner Blocks.
 *
 * @param {array} [innerBlocks=[]]      - Array of inner blocks.
 * @param {boolean} [isVariation=false] - Check if block is variation type.
 *
 * @access private
 *
 * @returns {object}
 */
export const getInnerBlocks = (innerBlocks = [], isVariation = false) => {
	return innerBlocks.map((blockItem) => {

		let blockInner;

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
