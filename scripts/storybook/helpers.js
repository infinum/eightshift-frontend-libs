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
 * Create Inner Blocks object.
 *
 * @param {object} blocks Blocks props object.
 * @param {int} count Number of blocks to show.
 */
export const blockInnerBlocks = (blocks, count) => {
  const output = [];
  let internalBlocks = [];

  if (!blocks.length) {
    internalBlocks = [blocks];
  } else {
    internalBlocks = blocks;
  }

  for (let i = 1; i <= count; i++) {
    for (const block of internalBlocks) {
      output.push({
        ...block.props.props.blocks[0],
        clientId: id(),
        isValid: true,
      });
    }
  }

  return output;
};

/**
 * Combine block details in one object.
 *
 * @param {string} name Block Name
 */
export const blockDetails = (manifest, globalManifest, innerBlocks = null, innerBlocksItems = 6, customOutput = false) => {
  const { blockName } = manifest;
  const { namespace } = globalManifest;

  const output = {
    attributes: {
      blockName,
      blockClass: blockClass(blockName),
      blockJsClass: blockJsClass(blockName),
      ...manifest.example,
    },
    innerBlocks: [],
    name: `${namespace}/${blockName}`,
    originalContent: '',
  };

  if (innerBlocks !== null) {
    output.innerBlocks = blockInnerBlocks(innerBlocks, innerBlocksItems);
  }

  if (!customOutput) {
    return {
      blocks: [
        output,
      ],
    };
  }

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
      blocks,
    },
  } = props;

  const blocksProps = blocks.map((block) => {
    block.attributes.hasWrapper = true;

    return {
      ...block,
      attributes: { ...block.attributes, ...block.attributes.hasWrapper },
      clientId: id(),
      isValid: true,
    };
  });

  return (
    <div className="playground">
      <SlotFillProvider>
        <DropZoneProvider>
          <BlockEditorProvider
            value={blocksProps}
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
