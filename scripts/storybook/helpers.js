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
import { useState } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';

/**
 * Create Inner Blocks.
 *
 * @param {array} innerBlocks Array of inner blocks.
 */
export const getInnerBlocks = (innerBlocks = []) => {
  return innerBlocks.map((blockItem) => {
    const blockInner = createBlock(blockItem.name);

    // Set example attributes for inner block.
    blockInner.attributes = {
      ...blockInner.attributes,
      ...blockItem.attributes,
    };

    // Run recursive because of multiple nested blocks.
    blockInner.innerBlocks = getInnerBlocks(blockItem.innerBlocks);

    return blockInner;
  });
};

/**
 * Combine block details in one object.
 *
 * @param {object} manifest Block Manifest data.
 * @param {object} globalManifest Global Blocks Manifest data.
 */
export const blockDetails = (manifest, globalManifest) => {
  const { blockName } = manifest;
  const { namespace } = globalManifest;

  return {
    blockFullName: `${namespace}/${blockName}`,
    example: manifest.example.attributes,
    innerBlocks: manifest.example.innerBlocks,
  };
};

/**
 * Load actual Block Editor and all the magic.
 *
 * @param {object} props All Props for blocks.
 */
export const Gutenberg = (props) => {
  const {
    props: {
      blockFullName,
      example,
      innerBlocks,
    },
  } = props;

  // Set default registered blocks.
  const [blocks, updateBlocks] = useState([]);

  // Create top level blocks.
  const block = createBlock(blockFullName);

  // Set attributes, shared, block and example.
  block.attributes = {
    ...block.attributes,
    ...example,
  };

  // Create new block in inner block key.
  block.innerBlocks = getInnerBlocks(innerBlocks);

  // Push all created blocks in store.
  blocks.push(block);

  console.log(blocks);
  

  dispatch('core/block-editor').insertBlocks(blocks);

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
