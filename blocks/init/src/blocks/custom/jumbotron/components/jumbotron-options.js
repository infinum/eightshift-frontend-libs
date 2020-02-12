import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import { ImageOptions } from './../../../components/image/components/image-options';

export const JumbotronOptions = (props) => {
  const {
    attributes: {
      media,
      contentHorizontalPosition,
      contentVerticalPosition,
      mediaHorizontalPosition,
    },
    actions: {
      onChangeMedia,
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
          options={[
            { label: __('Left', 'eightshift-boilerplate'), value: 'left' },
            { label: __('Center', 'eightshift-boilerplate'), value: 'center' },
            { label: __('Right', 'eightshift-boilerplate'), value: 'right' },
          ]}
          onChange={onChangeContentHorizontalPosition}
        />
      }

      {onChangeContentVerticalPosition &&
        <SelectControl
          label={__('Content Vertical Position', 'eightshift-boilerplate')}
          value={contentVerticalPosition}
          options={[
            { label: __('Top', 'eightshift-boilerplate'), value: 'top' },
            { label: __('Center', 'eightshift-boilerplate'), value: 'center' },
            { label: __('Bottom', 'eightshift-boilerplate'), value: 'bottom' },
          ]}
          onChange={onChangeContentVerticalPosition}
        />
      }

      {onChangeMediaHorizontalPosition &&
        <SelectControl
          label={__('Media Horizontal Position', 'eightshift-boilerplate')}
          value={mediaHorizontalPosition}
          options={[
            { label: __('Left', 'eightshift-boilerplate'), value: 'left' },
            { label: __('Right', 'eightshift-boilerplate'), value: 'right' },
          ]}
          onChange={onChangeMediaHorizontalPosition}
        />
      }

      <ImageOptions
        media={(typeof media === 'undefined') || media}
        onChangeMedia={onChangeMedia}
      />

    </PanelBody>
  );
};
