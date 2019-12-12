import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import { ButtonOptions } from '../../../components/button/components/button-options';
import { ImageOptions } from '../../../components/image/components/image-options';

export const CardListOptions = (props) => {
  const {
    attributes: {
      mediaPosition,
      buttonUrl,
      buttonStyleSize,
      buttonStyleSizeWidth,
      buttonStyleColor,
      buttonId,
      buttonIcon,
      buttonTitle,
      media,
    },
    actions: {
      onChangeMedia,
      onChangeMediaPosition,
      onChangeButtonUrl,
      onChangeButtonStyleSize,
      onChangeButtonStyleSizeWidth,
      onChangeButtonStyleColor,
      onChangeButtonId,
      onChangeButtonIcon,
      onChangeButtonTitle,
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
        url={buttonUrl}
        onChangeUrl={onChangeButtonUrl}
        styleSize={buttonStyleSize}
        onChangeStyleSize={onChangeButtonStyleSize}
        styleSizeWidth={buttonStyleSizeWidth}
        onChangeStyleSizeWidth={onChangeButtonStyleSizeWidth}
        styleColor={buttonStyleColor}
        onChangeStyleColor={onChangeButtonStyleColor}
        id={buttonId}
        onChangeId={onChangeButtonId}
        icon={buttonIcon}
        onChangeIcon={onChangeButtonIcon}
        title={buttonTitle}
        onChangeTitle={onChangeButtonTitle}
      />
    </PanelBody>
  );
};
