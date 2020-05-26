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

/**
 * Define generic block ID.
 */
export const id = () => (Math.random() * Math.floor(10)).toString(36).substring(2);

/**
 * Define block Class name that you get from php part on the real project.
 *
 * @param {string} name Block Name
 */
export const blockClass = (name) => `block-${name}`;

/**
 * Define block Javascript Class name that you get from php part on the real project.
 *
 * @param {string} name Block Name
 */
export const blockJsClass = (name) => `js-block-${name}`;

/**
 * Return shared attributes.
 *
 * @param {string} blockName Block name, simple or with namespace.
 * @param {string} namespace Namespace if added will try to remove namespace from block name.
 */
export const getSharedAttributes = (blockName, namespace = '') => {
  let name = blockName;

  if (namespace !== '') {
    name = blockName.split('/');
    name = name[name.length - 1];
  }

  return {
    blockName: name,
    blockClass: blockClass(name),
    blockJsClass: blockJsClass(name),
  };
};

/**
 * Create Inner Blocks.
 *
 * @param {array} innerBlocks Array of inner blocks.
 * @param {string} namespace Blocks namespace.
 */
export const getInnerBlocks = (innerBlocks = [], namespace) => {
  return innerBlocks.map((blockItem) => {
    const blockInner = createBlock(blockItem.name);

    blockInner.attributes = {
      ...getSharedAttributes(blockItem.name, namespace),
      ...blockInner.attributes,
      ...blockItem.attributes,
    };

    console.log(blockInner.innerBlocks);
    blockInner.innerBlocks = getInnerBlocks(blockInner.innerBlocks, namespace);

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

  const output = {
    blockFullName: `${namespace}/${blockName}`,
    namespace,
    attributes: {
      ...getSharedAttributes(blockName),
    },
    example: manifest.example.attributes,
    innerBlocks: manifest.example.innerBlocks,
  };

  return output;
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
      namespace,
      example,
      innerBlocks,
      attributes,
    },
  } = props;

  // Set default registered blocks.
  const [blocks, updateBlocks] = useState([]);

  // Create top level blocks.
  const block = createBlock(blockFullName);

  // Set attributes, shared, block and example.
  block.attributes = {
    ...attributes,
    ...block.attributes,
    ...example,
  };

  // Create new block in inner block key.
  block.innerBlocks = getInnerBlocks(innerBlocks, namespace);

  // Push all created blocks in store.
  blocks.push(block);

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
