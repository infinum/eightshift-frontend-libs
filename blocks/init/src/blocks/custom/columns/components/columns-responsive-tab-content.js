/* eslint-disable no-unused-vars */

import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, Icon } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';

export const columnsGutterVertical = [
  { label: __('None (0px)', 'eightshift-boilerplate'), value: 'none' },
  { label: __('Default (25px)', 'eightshift-boilerplate'), value: 'default' },
  { label: __('Big (50px)', 'eightshift-boilerplate'), value: 'big' },
];

export const columsGutterHorizontal = [
  { label: __('None (0px)', 'eightshift-boilerplate'), value: 'none' },
  { label: __('Default (25px)', 'eightshift-boilerplate'), value: 'default' },
  { label: __('Big (50px)', 'eightshift-boilerplate'), value: 'big' },
];

export const ColumnsResponsiveTabContent = (props) => {
  const {
    gutterVertical,
    onChangeGutterVertical,
    gutterHorizontal,
    onChangeGutterHorizontal,
  } = props;


  return (
    <Fragment>
      {onChangeGutterVertical &&
        <SelectControl
          label={
            <Fragment>
              <Icon icon={() => icons.containerWidth} />
              {__('Gutter Vertical', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={__('Option to change vertical gutter.', 'eightshift-boilerplate')}
          value={gutterVertical}
          options={columnsGutterVertical}
          onChange={onChangeGutterVertical}
        />
      }

      {onChangeGutterHorizontal &&
        <SelectControl
          label={
            <Fragment>
              <Icon icon={() => icons.containerHeight} />
              {__('Gutter Horizontal', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={__('Option to change horizontal gutter.', 'eightshift-boilerplate')}
          value={gutterHorizontal}
          options={columsGutterHorizontal}
          onChange={onChangeGutterHorizontal}
        />
      }
    </Fragment>
  );
};
