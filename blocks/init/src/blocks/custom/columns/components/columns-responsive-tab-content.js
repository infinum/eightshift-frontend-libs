/* eslint-disable no-unused-vars */

import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

export const columnsGutterVertical = [
  { label: __('Default (25px)', 'eightshift-boilerplate'), value: 'default' },
  { label: __('Big (50px)', 'eightshift-boilerplate'), value: 'big' },
  { label: __('None (0px)', 'eightshift-boilerplate'), value: 'none' },
];

export const columsGutterHorizontal = [
  { label: __('Default (25px)', 'eightshift-boilerplate'), value: 'default' },
  { label: __('Big (50px)', 'eightshift-boilerplate'), value: 'big' },
  { label: __('None (0px)', 'eightshift-boilerplate'), value: 'none' },
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
          label={__('Gutter Vertical', 'eightshift-boilerplate')}
          help={__('Option to change vertical gutter.', 'eightshift-boilerplate')}
          value={gutterVertical}
          options={columnsGutterVertical}
          onChange={onChangeGutterVertical}
        />
      }

      {onChangeGutterHorizontal &&
        <SelectControl
          label={__('Gutter Horizontal', 'eightshift-boilerplate')}
          help={__('Option to change horizontal gutter.', 'eightshift-boilerplate')}
          value={gutterHorizontal}
          options={columsGutterHorizontal}
          onChange={onChangeGutterHorizontal}
        />
      }
    </Fragment>
  );
};
