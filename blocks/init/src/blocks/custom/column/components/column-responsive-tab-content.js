/* eslint-disable no-unused-vars */

import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, RangeControl, ToggleControl, Icon } from '@wordpress/components';
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
              <Icon icon={() => <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m18.4375 4v5.61390625l-3.9939844-3.99398437-1.1048828 1.10484374 2.1190234 2.11898438h-10.9304687l2.11902344-2.11898438-1.10492188-1.10484374-3.97878906 3.97878906v-5.59871094h-1.5625v11.328125h1.5625v-5.67683594l3.97878906 3.97878904 1.10492188-1.1048437-2.11902344-2.1189844h10.9304687l-2.1190234 2.1189844 1.1048828 1.1048437 3.9939844-3.99398435v5.69203125h1.5625v-11.328125z" /></svg>} />
              {__('Width', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={sprintf(__('Option to change width block in grid from the left. Change block width in %d columns range. Example 6 = 50% screen width. If you set a value to -1 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate'), globalSettings.maxCols)}
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
              <Icon icon={() => <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m19 10c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1h-18c-.552 0-1-.448-1-1v-6c0-.552.448-1 1-1h2v2h2v-2h2v4h2v-4h2v2h2v-2h2v4h2v-4zm-3-8 3.414 3-3.414 3v-2h-16v-2h16z" /></svg>} />
              {__('', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={sprintf(__('Option to change offset block in grid from the left. Change block offset in %d columns range. Example 6 = 50% screen width. If you set a value to -1 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate'), globalSettings.maxCols)}
          value={offset}
          onChange={onChangeOffset}
          min={widthOptions.min}
          max={widthOptions.max}
          step={widthOptions.step}
          initialPosition={widthOptions.initial}
        />
      )}

      {onChangeVerticalAlign && (
        <SelectControl
          label={__('Vertical Align', 'eightshift-boilerplate')}
          help={__('Option to vertically align item in its container.', 'eightshift-boilerplate')}
          value={verticalAlign}
          options={[
            { label: __('Center', 'eightshift-boilerplate'), value: 'center' },
            { label: __('Top', 'eightshift-boilerplate'), value: 'top' },
            { label: __('Bottom', 'eightshift-boilerplate'), value: 'bottom' },
          ]}
          onChange={onChangeVerticalAlign}
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
