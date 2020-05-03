import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';

export const jumbotronContentHorizontalPosition = [
  { label: __('Left', 'eightshift-boilerplate'), value: 'left' },
  { label: __('Center', 'eightshift-boilerplate'), value: 'center' },
  { label: __('Right', 'eightshift-boilerplate'), value: 'right' },
];

export const jumbotronContentVerticalPosition = [
  { label: __('Top', 'eightshift-boilerplate'), value: 'top' },
  { label: __('Center', 'eightshift-boilerplate'), value: 'center' },
  { label: __('Bottom', 'eightshift-boilerplate'), value: 'bottom' },
];

export const jumbotronMediaHorizontalPosition = [
  { label: __('Left', 'eightshift-boilerplate'), value: 'left' },
  { label: __('Right', 'eightshift-boilerplate'), value: 'right' },
];

export const JumbotronOptions = (props) => {
  const {
    attributes: {
      contentHorizontalPosition,
      contentVerticalPosition,
      mediaHorizontalPosition,
    },
    actions: {
      onChangeContentHorizontalPosition,
      onChangeContentVerticalPosition,
      onChangeMediaHorizontalPosition,
    },
  } = props;

  return (
    <PanelBody title={__('Jumbotron Details', 'eightshift-boilerplate')}>

      {onChangeContentHorizontalPosition &&
        <SelectControl
          label={__('Content Horizontal Position', 'eightshift-boilerplate')}
          value={contentHorizontalPosition}
          options={jumbotronContentHorizontalPosition}
          onChange={onChangeContentHorizontalPosition}
        />
      }

      {onChangeContentVerticalPosition &&
        <SelectControl
          label={__('Content Vertical Position', 'eightshift-boilerplate')}
          value={contentVerticalPosition}
          options={jumbotronContentVerticalPosition}
          onChange={onChangeContentVerticalPosition}
        />
      }

      {onChangeMediaHorizontalPosition &&
        <SelectControl
          label={__('Media Horizontal Position', 'eightshift-boilerplate')}
          value={mediaHorizontalPosition}
          options={jumbotronMediaHorizontalPosition}
          onChange={onChangeMediaHorizontalPosition}
        />
      }

    </PanelBody>
  );
};
