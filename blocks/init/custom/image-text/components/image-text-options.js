import React from 'react';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

export const ImageTextOptions = (props) => {
  const {
    attributes: {
      imagePosition,
      styleFullHeight,
    },
    actions: {
      onChangeMedia,
      onChangeImagePosition,
      onChangeStyleFullHeight,
    },
  } = props;

  return (
    <PanelBody title={__('Image Text Details', 'eightshift-boilerplate')}>

      {onChangeImagePosition &&
        <SelectControl
          label={__('Image Position', 'eightshift-boilerplate')}
          value={imagePosition}
          options={[
            { label: __('Left', 'eightshift-boilerplate'), value: 'left' },
            { label: __('Right', 'eightshift-boilerplate'), value: 'right' },
          ]}
          onChange={onChangeImagePosition}
        />
      }

      {onChangeStyleFullHeight &&
        <ToggleControl
          label={__('Full Window Height', 'eightshift-boilerplate')}
          checked={styleFullHeight}
          onChange={onChangeStyleFullHeight}
        />
      }

      {onChangeMedia &&
        <div className="components-base-control">
          <label className="components-base-control__label" htmlFor="url">{__('Media Type', 'eightshift-boilerplate')}</label>
          <MediaPlaceholder
            onSelect={onChangeMedia}
            accept={'image/*,video/*'}
            allowedTypes={['video', 'image', 'application/json']}
          />
        </div>
      }
    </PanelBody>
  );
};
