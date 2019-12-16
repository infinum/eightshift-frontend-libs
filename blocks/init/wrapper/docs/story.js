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
    styleBackgroundColor: manifest.attributes.styleBackgroundColor.default,

    styleContentWidthLarge: manifest.attributes.styleContentWidthLarge.default,
    styleContentOffsetLarge: manifest.attributes.styleContentOffsetLarge.default,
    styleContainerWidthLarge: manifest.attributes.styleContainerWidthLarge.default,
    styleContainerSpacingLarge: manifest.attributes.styleContainerSpacingLarge.default,
    styleSpacingTopLarge: '',
    styleSpacingBottomLarge: manifest.attributes.styleSpacingBottomLarge.default,
    styleHideBlockLarge: manifest.attributes.styleHideBlockLarge.default,

    styleContentWidthDesktop: '',
    styleContentOffsetDesktop: '',
    styleContainerWidthDesktop: '',
    styleContainerSpacingDesktop: '',
    styleSpacingTopDesktop: '',
    styleSpacingBottomDesktop: '',
    styleHideBlockDesktop: manifest.attributes.styleHideBlockDesktop.default,

    styleContentWidthTablet: '',
    styleContentOffsetTablet: '',
    styleContainerWidthTablet: '',
    styleContainerSpacingTablet: '',
    styleSpacingTopTablet: '',
    styleSpacingBottomTablet: '',
    styleHideBlockTablet: '',

    styleContentWidthMobile: '',
    styleContentOffsetMobile: '',
    styleContainerWidthMobile: '',
    styleContainerSpacingMobile: '',
    styleSpacingTopMobile: '',
    styleSpacingBottomMobile: '',
    styleHideBlockMobile: '',
  },
  actions: {
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
  contentWidth: manifest.attributes.styleContentWidthLarge.default,
  contentOffset: manifest.attributes.styleContentOffsetLarge.default,
  containerWidth: manifest.attributes.styleContainerWidthLarge.default,
  containerSpacing: manifest.attributes.styleContainerSpacingLarge.default,
  spacingTop: manifest.attributes.styleSpacingBottomLarge.default,
  spacingBottom: manifest.attributes.styleSpacingBottomLarge.default,
  hideBlock: manifest.attributes.styleHideBlockLarge.default,
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
