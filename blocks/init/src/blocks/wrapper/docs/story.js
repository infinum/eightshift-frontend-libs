import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../manifest.json';
import readme from './readme.md';
import { WrapperOptions } from '../components/wrapper-options';
import { WrapperResponsiveTabContent } from '../components/wrapper-responsive-tab-content';
import { WrapperResponsiveTabContentSimple } from '../components/wrapper-responsive-tab-content-simple';

export default {
  title: 'Wrapper|Wrapper',
  parameters: {
    notes: readme,
  },
};

const optionsProps = {
  attributes: {
    hasWrapper: true,
    wrapperId: 'Wrapper ID',
    wrapperBackgroundColor: manifest.attributes.wrapperBackgroundColor.default,
    wrapperWidth: manifest.attributes.wrapperWidth,
    wrapperOffset: manifest.attributes.wrapperOffset,
    wrapperContainerWidth: manifest.attributes.wrapperContainerWidth,
    wrapperGutter: manifest.attributes.wrapperGutter,
    wrapperSpacingTop: manifest.attributes.wrapperSpacingTop,
    wrapperSpacingBottom: manifest.attributes.wrapperSpacingBottom,
    wrapperHideBlock: manifest.attributes.wrapperHideBlock,
  },
  actions: {
    onChangeHasWrapper: () => {},

    onChangeWrapperWidthLarge: () => {},
    onChangeWrapperOffsetLarge: () => {},
    onChangeWrapperContainerWidthLarge: () => {},
    onChangeWrapperGutterLarge: () => {},
    onChangeWrapperSpacingTopLarge: () => {},
    onChangeWrapperSpacingBottomLarge: () => {},
    onChangeWrapperHideBlockLarge: () => {},

    onChangeWrapperWidthDesktop: () => {},
    onChangeWrapperOffsetDesktop: () => {},
    onChangeWrapperContainerWidthDesktop: () => {},
    onChangeWrapperGutterDesktop: () => {},
    onChangeWrapperSpacingTopDesktop: () => {},
    onChangeWrapperSpacingBottomDesktop: () => {},
    onChangeWrapperHideBlockDesktop: () => {},

    onChangeWrapperWidthTablet: () => {},
    onChangeWrapperOffsetTablet: () => {},
    onChangeWrapperContainerWidthTablet: () => {},
    onChangeWrapperGutterTablet: () => {},
    onChangeWrapperSpacingTopTablet: () => {},
    onChangeWrapperSpacingBottomTablet: () => {},
    onChangeWrapperHideBlockTablet: () => {},

    onChangeWrapperWidthMobile: () => {},
    onChangeWrapperOffsetMobile: () => {},
    onChangeWrapperContainerWidthMobile: () => {},
    onChangeWrapperGutterMobile: () => {},
    onChangeWrapperSpacingTopMobile: () => {},
    onChangeWrapperSpacingBottomMobile: () => {},
    onChangeWrapperHideBlockMobile: () => {},

    onChangeWrapperBackgroundColor: () => {},
    onChangeWrapperId: () => {},
  },
};

const ResponsiveTabContentProps = {
  type: 'large',
  width: manifest.attributes.wrapperWidth.default,
  offset: manifest.attributes.wrapperOffset.default,
  containerWidth: manifest.attributes.wrapperContainerWidth.default,
  gutter: manifest.attributes.wrapperGutter.default,
  spacingTop: manifest.attributes.wrapperSpacingBottom.default,
  spacingBottom: manifest.attributes.wrapperSpacingBottom.default,
  hideBlock: manifest.attributes.wrapperHideBlock.default,
  onChangeWidth: () => {},
  onChangeOffset: () => {},
  onChangeContainerWidth: () => {},
  onChangeGutter: () => {},
  onChangeSpacingTop: () => {},
  onChangeSpacingBottom: () => {},
  onChangeHideBlock: () => {},
};

const ResponsiveTabContentSimpleProps = {
  type: 'large',
  spacingTop: manifest.attributes.wrapperSpacingBottom.default,
  spacingBottom: manifest.attributes.wrapperSpacingBottom.default,
  hideBlock: manifest.attributes.wrapperHideBlock.default,
  onChangeSpacingTop: () => {},
  onChangeSpacingBottom: () => {},
  onChangeHideBlock: () => {},
};

export const editor = () => (
  <div>
    {'For Implementation details check block with Wrapper options checked.'}
  </div>
);

export const options = () => (
  <WrapperOptions
    {...optionsProps}
  />
);

export const responsiveTabContent = () => (
  <WrapperResponsiveTabContent
    {...ResponsiveTabContentProps}
  />
);

export const responsiveTabContentSimple = () => (
  <WrapperResponsiveTabContentSimple
    {...ResponsiveTabContentSimpleProps}
  />
);
