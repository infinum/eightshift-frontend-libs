import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, RangeControl, Icon } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import globalSettings from './../../manifest.json';
import { WrapperResponsiveTabContentSimple } from './wrapper-responsive-tab-content-simple';

export const wrapperContentOffsetOptions = [
  { label: __('Not Set', 'eightshift-boilerplate'), value: '' },
  { label: __('Center', 'eightshift-boilerplate'), value: 'center' },
];

export const wrapperContainerWidthOptions = [
  { label: __('Not Set', 'eightshift-boilerplate'), value: '' },
  { label: sprintf(__('Default (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.containers.default), value: 'default' },
];

export const wrapperContainerSpacingOptions = [
  { label: __('Not Set', 'eightshift-boilerplate'), value: '' },
  { label: sprintf(__('Default (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.gutters.default), value: 'default' },
  { label: sprintf(__('No Spacing (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.gutters.none), value: 'none' },
];

export const WrapperResponsiveTabContent = (props) => {
  const {
    type,
    useSimpleWrapper,
    contentWidth,
    contentOffset,
    containerWidth,
    containerSpacing,
    spacingTop,
    spacingBottom,
    hideBlock,
    onChangeContentWidth,
    onChangeContentOffset,
    onChangeContainerWidth,
    onChangeContainerSpacing,
    onChangeSpacingTop,
    onChangeSpacingBottom,
    onChangeHideBlock,
  } = props;

  const widthOptions = {
    min: -1,
    max: globalSettings.globalVariables.maxCols,
    step: 1,
    initial: globalSettings.globalVariables.maxCols,
  };

  return (
    <Fragment>
      {!useSimpleWrapper &&
        <Fragment>
          {onChangeContentWidth && (
            <RangeControl
              label={
                <Fragment>
                  <Icon icon={icons.width} />
                  {__('Content Width', 'eightshift-boilerplate')}
                </Fragment>
              }
              help={sprintf('Change block width %s in columns range. Example: 6 = 50 percent of the screen width. If you set a value to -1 it will not be used and the parent brakepoint will be used.', globalSettings.globalVariables.maxCols)}
              allowReset={true}
              value={contentWidth[type]}
              onChange={onChangeContentWidth}
              min={widthOptions.min}
              max={widthOptions.max}
              step={widthOptions.step}
              initialPosition={widthOptions.initial}
            />
          )}

          {onChangeContentOffset && (
            <SelectControl
              label={
                <Fragment>
                  <Icon icon={icons.offset} />
                  {__('Content Offset', 'eightshift-boilerplate')}
                </Fragment>
              }
              help={__('Change content position inside a block. Generally if the block is aligned to the left or in the middle.', 'eightshift-boilerplate')}
              value={contentOffset[type]}
              options={wrapperContentOffsetOptions}
              onChange={onChangeContentOffset}
            />
          )}

          {onChangeContainerWidth &&
            <SelectControl
              label={
                <Fragment>
                  <Icon icon={icons.containerWidth} />
                  {__('Container Width', 'eightshift-boilerplate')}
                </Fragment>
              }
              help={__('Change Container width. Changing this option will affect total width of the block and the total size of grid inside the block.', 'eightshift-boilerplate')}
              value={containerWidth[type]}
              options={wrapperContainerWidthOptions}
              onChange={onChangeContainerWidth}
            />
          }

          {onChangeContainerSpacing &&
            <SelectControl
              label={
                <Fragment>
                  <Icon icon={icons.containerSpacing} />
                  {__('Container Spacing', 'eightshift-boilerplate')}
                </Fragment>
              }
              help={__('Change Container spacing on the left and right. More popular name is Container Gutter.', 'eightshift-boilerplate')}
              value={containerSpacing[type]}
              options={wrapperContainerSpacingOptions}
              onChange={onChangeContainerSpacing}
            />
          }
        </Fragment>
      }

      <WrapperResponsiveTabContentSimple
        type={type}
        spacingTop={spacingTop}
        spacingBottom={spacingBottom}
        hideBlock={hideBlock}
        onChangeSpacingTop={onChangeSpacingTop}
        onChangeSpacingBottom={onChangeSpacingBottom}
        onChangeHideBlock={onChangeHideBlock}
      />

    </Fragment>
  );
};
