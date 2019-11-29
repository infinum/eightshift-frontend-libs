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

export const Gutenberg = (blocks) => (
  <div className="playground">
    <SlotFillProvider>
      <DropZoneProvider>
        <BlockEditorProvider
          value={ blocks.blocks }
        >
          <div className="playground__sidebar">
            <BlockInspector />
          </div>
          <div className="editor-styles-wrapper">
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

export const id = () => (Math.random() * Math.floor(10)).toString(36).substring(2);

export const blockClass = (name) => `block-${name}`;

export const blockJsClass = (name) => `js-block-${name}`;

export const blockDetails = (name) => {
  return {
    blockName: name,
    blockClass: blockClass(name),
    blockJsClass: blockJsClass(name),
  }
};

export const blockInnerBlocks = (blocks, count) => {
  const output = [];

  for(let i = 1; i <= count; i++) {
    output.push({
      ...blocks[0],
      clientId: `${blocks[0].clientId}${i}`,
    });
  }

  return output;
}


