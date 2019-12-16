import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import { ButtonOptions } from '../../../components/button/components/button-options';
import { ImageOptions } from '../../../components/image/components/image-options';

export const CardListOptions = (props) => {
  const {
    attributes: {
      mediaPosition,
      media,
      button,
    },
    actions: {
      onChangeMedia,
      onChangeMediaPosition,
      onChangeButtonUrl,
      onChangeButtonStyleSize,
      onChangeButtonStyleSizeWidth,
      onChangeButtonStyleColor,
      onChangeButtonId,
      onChangeButtonTitle
    },
  } = props;

  return (
    <PanelBody title={__('Card List Details', 'eightshift-boilerplate')}>

      {onChangeMediaPosition &&
        <SelectControl
          label={__('Media Position', 'eightshift-boilerplate')}
          value={mediaPosition}
          options={[
            { label: __('Left', 'eightshift-boilerplate'), value: 'left' },
            { label: __('Right', 'eightshift-boilerplate'), value: 'right' },
          ]}
          onChange={onChangeMediaPosition}
        />
      }

      <ImageOptions
        media={media}
        onChangeMedia={onChangeMedia}
      />

      <ButtonOptions
        button={button}
        onChangeUrl={onChangeButtonUrl}
        onChangeStyleSize={onChangeButtonStyleSize}
        onChangeStyleSizeWidth={onChangeButtonStyleSizeWidth}
        onChangeStyleColor={onChangeButtonStyleColor}
        onChangeId={onChangeButtonId}
        onChangeTitle={onChangeButtonTitle}
      />
    </PanelBody>
  );
};
