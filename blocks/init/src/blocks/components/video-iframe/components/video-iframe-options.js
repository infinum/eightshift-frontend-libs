import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl } from '@wordpress/components';

export const aspectRatioSizes = [
  { label: __('16:9', 'eightshift-boilerplate'), value: 'default' },
  { label: __('21:9', 'eightshift-boilerplate'), value: 'twentyone-nine' },
];

export const VideoIframeOptions = (props) => {
  const {
    onChangeId,
    id,
    aspectRatio,
    onChangeAspectRatio,
  } = props;

  return (
    <Fragment>
      {onChangeId &&
        <TextControl
          label={__('Video ID', 'eightshift-boilerplate')}
          value={id}
          onChange={onChangeId}
        />
      }

      {onChangeAspectRatio &&
        <SelectControl
          label={__('Aspect Ratio', 'eightshift-boilerplate')}
          value={aspectRatio}
          options={aspectRatioSizes}
          onChange={onChangeAspectRatio}
        />
      }
    </Fragment>
  );
};
