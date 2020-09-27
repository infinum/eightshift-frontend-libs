/* eslint-disable no-unused-vars */

import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import { RangeControl, ToggleControl, Icon } from '@wordpress/components';
import globalSettings from './../../../manifest.json';

export const ColumnResponsiveTabContent = (props) => {
    const {
        width,
        onChangeWidth,
        hide,
        onChangeHide,
        offset,
        onChangeOffset,
        verticalAlign,
        onChangeVerticalAlign,
    } = props;

    const widthOptions = {
        min: -1,
        max: globalSettings.globalVariables.maxCols,
        step: 1,
        initial: globalSettings.globalVariables.maxCols,
    };

    return (
    <Fragment>
      {onChangeWidth && (
            <RangeControl
            label={
                <Fragment>
                <Icon icon={icons.width} />
                {__('Width', 'eightshift-boilerplate')}
                </Fragment>
          }
          help={sprintf(__('Option to change the block width in the grid from the left. Change column width in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate'), globalSettings.globalVariables.maxCols)}
          allowReset={true}
          value={width}
          onChange={onChangeWidth}
          min={widthOptions.min}
          max={widthOptions.max}
          step={widthOptions.step}
          initialPosition={widthOptions.initial}
        />
      )}

      {onChangeOffset && (
            <RangeControl
            label={
                <Fragment>
                <Icon icon={icons.offset} />
                {__('Offset', 'eightshift-boilerplate')}
                </Fragment>
          }
          help={sprintf(__('Option to change the block offset in the grid from the left. Change block offset in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate'), globalSettings.globalVariables.maxCols)}
          allowReset={true}
          value={offset}
          onChange={onChangeOffset}
          min={widthOptions.min}
          max={widthOptions.max}
          step={widthOptions.step}
          initialPosition={widthOptions.initial}
        />
      )}

      {onChangeHide &&
            <ToggleControl
            label={__('Hide', 'eightshift-boilerplate')}
            help={__('Toggle visibility.', 'eightshift-boilerplate')}
            checked={hide}
            onChange={onChangeHide}
            />
      }
    </Fragment>
  );
};
