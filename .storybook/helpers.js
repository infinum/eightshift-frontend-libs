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

/**
 * Generate Blocks Wrapper.
 *
 * @param {bool} isActive Set if Wrapper is active or not.
 */
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

/**
 * Define if block has wrapper decorator. Used in storybook knobs.
 *
 * @param {json} manifest Block Manifest data.
 */
export const hasWrapperDecorator = (manifest) => {
  if ( typeof manifest.hasWrapper === 'undefined' ) {
    manifest.hasWrapper = true;
  }

  return (manifest.hasWrapper ? { decorators: [withKnobs] } : '')
};

/**
 * Load actial Gutenberg and all the magic.
 *
 * @param {object} props All Props for blocks.
 */
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
      clientId: id(),
      isValid: true,
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
 * Combine block details in one object.
 *
 * @param {string} name Block Name
 */
export const blockDetails = (name) => {
  return {
    blockName: name,
    blockClass: blockClass(name),
    blockJsClass: blockJsClass(name),
  }
};

/**
 * Create Inner Blocks object.
 *
 * @param {object} blocks Blocks props object.
 * @param {int} count Number of blocks to show.
 */
export const blockInnerBlocks = (blocks, count) => {
  const output = [];

  for(let i = 1; i <= count; i++) {
    output.push({
      ...blocks.props.props.blocks[0],
      clientId: id(),
      isValid: true,
    });
  }

  return output;
}
