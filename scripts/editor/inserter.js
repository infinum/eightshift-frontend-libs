import _ from 'lodash';
import { dispatch, select } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Development inserter made to insert one or multiple blocks in the dom using console.
 * 
 * Usage:
 * 
 * 1. Add this code in `application-blocks-editor.js` file:
 * `
 * import { inserter } from '@eightshift/frontend-libs/scripts/editor';
 *
 * inserter();
 * `
 *
 * 2. Open block editor and run the following commands in the console:
 *
 * Run all: `window.eightshiftInserter.runAll();`.
 * - namespace prop {string} -  Namespace of blocks to insert.
 * - save prop {bool} [save=false] -  Save dom if true.
 * - reset prop {bool} [reset=false] - Reset all in dom if true.
 * 
 * 
 * Run run one: `window.eightshiftInserter.runOne('full-block-name');`.
 * - name prop {string} - Full block name with namespace.
 * - save prop {bool} [save=false] - Save dom if true.
 * - reset prop {bool} [reset=false] - Reset all in dom if true.
 *
 * Run reset: `window.eightshiftInserter.runReset();`.
 *
 * Run save all: `window.eightshiftInserter.runSave();`.
 *
 */
export const inserter = () => {
	window['eightshiftInserter'] = {
		save: false,
		reset: false,
		runAll: function(
			namespace,
			save = this.save,
			reset = this.reset
		) {

			if (_.isEmpty(namespace)) {
				throw Error('Must provide namespace for this method.');
			}

			// Find all blocks.
			const blocks = select( 'core/blocks' ).getBlockTypes();

			// If reset is used remove all block from dom.
			if (reset) {
				dispatch('core/block-editor').resetBlocks([])
			}

			// Iterate all blocks by namespace.
			iterateBlocksByNamespace(blocks, namespace);

			// If save is used save after insertion in dom.
			if (save) {
				dispatch('core/editor').savePost();
			}
		},
		runOne: function(
			name,
			save = this.save,
			reset = this.reset,
		) {

			if (_.isEmpty(name)) {
				throw Error('Must provide full block name for this method. Example eightshift-boilerplate/card.');
			}

			// Find all blocks.
			const blocks = select( 'core/blocks' ).getBlockTypes();

			// If reset is used remove all block from dom.
			if (reset) {
				dispatch('core/block-editor').resetBlocks([])
			}

			// Iterate all blocks by full block name.
			iterateBlocksByName(blocks, name);

			// If save is used save after insertion in dom.
			if (save) {
				dispatch('core/editor').savePost();
			}
		},
		runReset: function() {
			// Remove all block from dom.
			dispatch('core/block-editor').resetBlocks([])
		},
		runSave: function() {
			// Save after insertion in dom.
			dispatch('core/editor').savePost();
		}
	}
}

/**
 * Iterate all blocks by full block name.
 *
 * @param {array} blocks         - List of all blocks registered in Block Editor.
 * @param {string} blockFullName - Full block name with namespace.
 */
export const iterateBlocksByName = (blocks, blockFullName) => {
	for (const value of blocks) {
		const {
			name,
		} = value;

		// Bailout if block name is not correct.
		if (name !== blockFullName) {
			continue;
		}

		// Insert in dom.
		insertOneBlock(value);
	}
}

/**
 * Iterate all blocks by namespace.
 *
 * @param {array} blocks     - List of all blocks registered in Block Editor.
 * @param {string} namespace - Namespace to find.
 */
export const iterateBlocksByNamespace = (blocks, namespace) => {
	for (const value of blocks) {
		const {
			name,
		} = value;

		// Split the name and find the namespace.
		const blockNamespace = name.split('/')[0];

		// Bailout if namespace is not correct.
		if (blockNamespace !== namespace) {
			continue;
		}

		// Insert in dom.
		insertOneBlock(value);
	}
}

/**
 * Insert one block in to dom.
 *
 * @param {object} block - One block details to insert.
 */
export const insertOneBlock = (block) => {
	// Prepare keys.
	const name = block?.name ?? '';
	const attributes = block?.example?.attributes ?? {};
	const innerBlocks = block?.example?.innerBlocks ?? [];

	// If no inner blocks are found use empty array.
	let innerBlocksOutput = [];

	// Use recursion if block has inner blocks.
	if (innerBlocks) {
		innerBlocksOutput = buildBlocks(innerBlocks);
	}

	// Create new block for insertion.
	const newBlock = createBlock(name, attributes, innerBlocksOutput);

	// Insert block in the dom.
	dispatch('core/block-editor').insertBlocks(newBlock);
}

/**
 * Build inner blocks by recursion.
 *
 * @param {array} blocks - List of all blocks to iterate.
 *
 * @returns {array}
 */
export const buildBlocks = (blocks) => {
	const output = [];

	blocks.forEach((block) => {
		const name = block.name;
		const attributes = block?.attributes ?? {};
		const innerBlocks = block?.innerBlocks ?? [];

		let innerBlocksOutput = [];

		if (!_.isEmpty(innerBlocks)) {
			innerBlocksOutput = createBlock( name, attributes, buildBlocks(innerBlocks));
		} else {
			innerBlocksOutput = createBlock( name, attributes, innerBlocks);
		}

		output.push(innerBlocksOutput);
	});

	return output;
}
