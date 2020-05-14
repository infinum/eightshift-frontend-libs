import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../manifest.json';
import readme from './readme.md';
import { WrapperOptions } from '../components/wrapper-options';
import { WrapperResponsiveTabContent } from '../components/wrapper-responsive-tab-content';

export default {
  title: 'Wrapper|Wrapper',
  parameters: {
    notes: readme,
  },
};

const optionsProps = {
  attributes: {
    id: 'Wrapper ID',
    anchor: '#anchor-id',
    hasWrapper: true,
    styleBackgroundColor: manifest.attributes.styleBackgroundColor.default,
    styleContentWidth: manifest.attributes.styleContentWidth,
    styleContentOffset: manifest.attributes.styleContentOffset,
    styleContainerWidth: manifest.attributes.styleContainerWidth,
    styleContainerSpacing: manifest.attributes.styleContainerSpacing,
    styleSpacingTop: manifest.attributes.styleSpacingTop,
    styleSpacingBottom: manifest.attributes.styleSpacingBottom,
    styleHideBlock: manifest.attributes.styleHideBlock,
  },
  actions: {
    onChangeHasWrapper: () => {},

    onChangeStyleContentWidthLarge: () => {},
    onChangeStyleContentOffsetLarge: () => {},
    onChangeStyleContainerWidthLarge: () => {},
    onChangeStyleContainerSpacingLarge: () => {},
    onChangeStyleSpacingTopLarge: () => {},
    onChangeStyleSpacingBottomLarge: () => {},
    onChangeStyleHideBlockLarge: () => {},

    onChangeStyleContentWidthDesktop: () => {},
    onChangeStyleContentOffsetDesktop: () => {},
    onChangeStyleContainerWidthDesktop: () => {},
    onChangeStyleContainerSpacingDesktop: () => {},
    onChangeStyleSpacingTopDesktop: () => {},
    onChangeStyleSpacingBottomDesktop: () => {},
    onChangeStyleHideBlockDesktop: () => {},

    onChangeStyleContentWidthTablet: () => {},
    onChangeStyleContentOffsetTablet: () => {},
    onChangeStyleContainerWidthTablet: () => {},
    onChangeStyleContainerSpacingTablet: () => {},
    onChangeStyleSpacingTopTablet: () => {},
    onChangeStyleSpacingBottomTablet: () => {},
    onChangeStyleHideBlockTablet: () => {},

    onChangeStyleContentWidthMobile: () => {},
    onChangeStyleContentOffsetMobile: () => {},
    onChangeStyleContainerWidthMobile: () => {},
    onChangeStyleContainerSpacingMobile: () => {},
    onChangeStyleSpacingTopMobile: () => {},
    onChangeStyleSpacingBottomMobile: () => {},
    onChangeStyleHideBlockMobile: () => {},

    onChangeStyleBackgroundColor: () => {},
    onChangeId: () => {},
    onChangeAnchor: () => {},
  },
};

const ResponsiveTabContentProps = {
  type: 'large',
  contentWidth: manifest.attributes.styleContentWidth.default,
  contentOffset: manifest.attributes.styleContentOffset.default,
  containerWidth: manifest.attributes.styleContainerWidth.default,
  containerSpacing: manifest.attributes.styleContainerSpacing.default,
  spacingTop: manifest.attributes.styleSpacingBottom.default,
  spacingBottom: manifest.attributes.styleSpacingBottom.default,
  hideBlock: manifest.attributes.styleHideBlock.default,
  onChangeContentWidth: () => {},
  onChangeContentOffset: () => {},
  onChangeContainerWidth: () => {},
  onChangeContainerSpacing: () => {},
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
  <WrapperResponsiveTabContent
    {...ResponsiveTabContentProps}
  />
);

export const responsiveTabContent = () => (
  <WrapperOptions
    {...optionsProps}
  />
);
