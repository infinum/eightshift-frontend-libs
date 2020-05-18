/* eslint-disable no-unused-vars */

import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, Icon } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';

export const columnsGutter = [
  { label: __('None (0px)', 'eightshift-boilerplate'), value: 'none' },
  { label: __('Default (25px)', 'eightshift-boilerplate'), value: 'default' },
  { label: __('Big (50px)', 'eightshift-boilerplate'), value: 'big' },
];

export const columsHorizontalSpacing = [
  { label: __('None (0px)', 'eightshift-boilerplate'), value: 'none' },
  { label: __('Default (25px)', 'eightshift-boilerplate'), value: 'default' },
  { label: __('Big (50px)', 'eightshift-boilerplate'), value: 'big' },
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
