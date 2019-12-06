import React from 'react'; // eslint-disable-line no-unused-vars
import { withKnobs, boolean } from '@storybook/addon-knobs';
import wrapperManifest from './../blocks/init/wrapper/manifest.json';
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


export const hasWrapper = (isActive) => {
  const wrapper = {
    hasWrapper: true,
    styleContentWidthLarge: wrapperManifest.attributes.styleContentWidthLarge.default,
    styleContentOffsetLarge: wrapperManifest.attributes.styleContentOffsetLarge.default,
    styleContainerWidthLarge: wrapperManifest.attributes.styleContainerWidthLarge.default,
    styleContainerSpacingLarge: wrapperManifest.attributes.styleContainerSpacingLarge.default,
    styleSpacingBottomLarge: wrapperManifest.attributes.styleSpacingBottomLarge.default,
    styleHideBlockLarge: wrapperManifest.attributes.styleHideBlockLarge.default,
    styleHideBlockDesktop: wrapperManifest.attributes.styleHideBlockDesktop.default,
  };

  return isActive ? wrapper : {};
}

export const hasWrapperDecorator = (manifest) => {
  if ( typeof manifest.hasWrapper === 'undefined' ) {
    manifest.hasWrapper = true;
  }

  return (manifest.hasWrapper ? { decorators: [withKnobs] } : '')
};

export const Gutenberg = (props) => {
  const {
    props: {
      blocks,
      useWrapper = false,
    },
  } = props;

  const blocksProps = blocks.map((block) => {
    return {
      ...block,
      attributes: {...block.attributes, ...hasWrapper(boolean('Use Wrapper', useWrapper))},
    }
  });

  return (
    <div className="playground">
      <SlotFillProvider>
        <DropZoneProvider>
          <BlockEditorProvider
            value={ blocksProps }
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
};

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
      ...blocks.props.props.blocks[0],
      clientId: `${blocks.props.props.blocks[0].clientId}${i}`,
    });
  }

  return output;
}
