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
import ReactHtmlParser from 'react-html-parser';

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
						settings={{
							__unstableIsPreviewMode: false,
							alignWide: false,
							autosaveInterval: 10000000,
						}}
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

/**
 * Item for nicely showing a property in a Storybook story.
 *
 * @param {object} props - SingleItemShowcase props.
 * @param {string|React.Component} props.title - Title of the card
 * @param {object?} [props.propsUsed] - List of highlighted props for this showcase. Should be in format of `{ 'propName': 'description', 'propName2': 'description2 , ...}`.
 * @param {string?} [props.demoContainerClass] - Class passed to the main container.
 * @param {array?} [props.additionalPanels] - Class passed to the main container.
 * @param {<React.component>} [props.children] - Main container contents - demo area.
 */
export const SingleItemShowcase = ({ title, propsUsed, demoContainerClass, additionalPanels, children }) => {
	return (
		<div
			className='es-display-flex es-flex-col es-rounded-1 es-shadow-sm es-border-cool-gray-100 es-text-3.25 es-w-80'
			style={{ '--wp-admin-theme-color': 'var(--es-admin-accent-color-default)' }}
		>
			<div className='es-px-4 es-py-2.5 es-border-b-cool-gray-100 es-bg-cool-gray-50'>
				<p className='es-m-0 es-p-0 es-text-3.5 es-font-weight-500'>{typeof title === 'string' ? ReactHtmlParser(title) : title}</p>
			</div>
			<div className={`es-p-4 ${demoContainerClass ?? ''}`}>
				{children}
			</div>

			{propsUsed &&
				<div className='es-p-4 es-border-t-cool-gray-100 es-mt-auto'>
					<p className='es-mt-0 es-mb-2 es-font-weight-500 es-text-3 es-color-cool-gray-500'>PROPS USED</p>

					<div className='es-v-spaced es-gap-1!'>
						{Object.entries(propsUsed).map(([propName, description], i, arr) => {
							return (
								<>
									<code className='es-m-0 es-color-eightshift-500'>{propName}</code>
									<p className={i < arr.length - 1 ? 'es-mt-0 es-mb-3' : 'es-m-0'}>{ReactHtmlParser(description)}</p>
								</>
							);
						})}
					</div>
				</div>
			}

			{additionalPanels && additionalPanels.map(({ title, content }, i) => {
				return (
					<div key={i} className='es-p-4 es-border-t-cool-gray-100'>
						{title &&
							<p className='es-mt-0 es-mb-2 es-font-weight-500 es-text-3 es-color-cool-gray-500'>{title.toUpperCase()}</p>
						}

						{content}
					</div>
				);
			})}
		</div>
	);
};
