import React from './node_modules/react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from './node_modules/@wordpress/i18n';
import { Fragment } from './node_modules/@wordpress/element';
import { SelectControl, RangeControl, Icon } from './node_modules/@wordpress/components';
import { icons } from './node_modules/@eightshift/frontend-libs/scripts/editor';
import globalSettings from '../../manifest.json';
import { WrapperResponsiveTabContentSimple } from './wrapper-responsive-tab-content-simple';

export const offsetOptions = [
  { label: __('Not Set', 'eightshift-boilerplate'), value: '' },
  { label: __('Center', 'eightshift-boilerplate'), value: 'center' },
];

export const containerWidthOptions = [
  { label: __('Not Set', 'eightshift-boilerplate'), value: '' },
  { label: sprintf(__('Default (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.containers.default), value: 'default' },
];

export const gutterOptions = [
  { label: __('Not Set', 'eightshift-boilerplate'), value: '' },
  { label: sprintf(__('Default (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.gutters.default), value: 'default' },
  { label: sprintf(__('No Spacing (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.gutters.none), value: 'none' },
];

export const WrapperResponsiveTabContent = (props) => {
  const {
    type,
    useSimple,
    width,
    offset,
    containerWidth,
    gutter,
    spacingTop,
    spacingBottom,
    hideBlock,
    onChangeWidth,
    onChangeOffset,
    onChangeContainerWidth,
    onChangeGutter,
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
      {!useSimple &&
        <Fragment>
          {onChangeWidth && (
            <RangeControl
              label={
                <Fragment>
                  <Icon icon={icons.width} />
                  {__('Content Width', 'eightshift-boilerplate')}
                </Fragment>
              }
              help={sprintf(__('Option to change the block width in the grid from the left. Change column width in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate'), globalSettings.globalVariables.maxCols)}
              allowReset={true}
              value={width[type]}
              onChange={onChangeWidth}
              min={widthOptions.min}
              max={widthOptions.max}
              step={widthOptions.step}
              initialPosition={widthOptions.initial}
            />
          )}

          {onChangeWidth && (
            <RangeControl
              label={
                <Fragment>
                  <Icon icon={icons.offset} />
                  {__('Content Offset', 'eightshift-boilerplate')}
                </Fragment>
              }
              help={sprintf(__('Option to change the block offset in the grid from the left. Change block offset in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate'), globalSettings.globalVariables.maxCols)}
              allowReset={true}
              value={offset[type]}
              onChange={onChangeOffset}
              min={widthOptions.min}
              max={widthOptions.max}
              step={widthOptions.step}
              initialPosition={widthOptions.initial}
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
              options={containerWidthOptions}
              onChange={onChangeContainerWidth}
            />
          }

          {onChangeGutter &&
            <SelectControl
              label={
                <Fragment>
                  <Icon icon={icons.gutter} />
                  {__('Container Spacing', 'eightshift-boilerplate')}
                </Fragment>
              }
              help={__('Change Container spacing on the left and right. More popular name is Container Gutter.', 'eightshift-boilerplate')}
              value={gutter[type]}
              options={gutterOptions}
              onChange={onChangeGutter}
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
