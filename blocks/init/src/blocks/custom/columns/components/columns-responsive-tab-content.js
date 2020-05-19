/* eslint-disable no-unused-vars */

import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, Icon } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import globalSettings from './../../../manifest.json';

export const columnsGutter = [
  { label: sprintf(__('None (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.gutters.none), value: 'none' },
  { label: sprintf(__('Default (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.gutters.default), value: 'default' },
  { label: sprintf(__('Big (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.gutters.big), value: 'big' },
];

export const columsHorizontalSpacing = [
  { label: sprintf(__('None (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.gutters.none), value: 'none' },
  { label: sprintf(__('Default (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.gutters.default), value: 'default' },
  { label: sprintf(__('Big (%s)', 'eightshift-boilerplate'), globalSettings.globalVariables.gutters.big), value: 'big' },
];

export const ColumnsResponsiveTabContent = (props) => {
  const {
    gutter,
    onChangeGutter,
    horizontalSpacing,
    onChangeHorizontalSpacing,
  } = props;


  return (
    <Fragment>
      {onChangeGutter &&
        <SelectControl
          label={
            <Fragment>
              <Icon icon={icons.containerWidth} />
              {__('Gutter', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={__('Option to change gutter (left and right).', 'eightshift-boilerplate')}
          value={gutter}
          options={columnsGutter}
          onChange={onChangeGutter}
        />
      }

      {onChangeHorizontalSpacing &&
        <SelectControl
          label={
            <Fragment>
              <Icon icon={icons.containerHeight} />
              {__('Horizontal Spacing', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={__('Option to change horizontal spacing (top and bottom).', 'eightshift-boilerplate')}
          value={horizontalSpacing}
          options={columsHorizontalSpacing}
          onChange={onChangeHorizontalSpacing}
        />
      }
    </Fragment>
  );
};
