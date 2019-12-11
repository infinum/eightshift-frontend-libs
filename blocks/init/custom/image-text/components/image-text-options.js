import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { ButtonOptions } from './../../../components/button/components/button-options';
import { ImageOptions } from './../../../components/image/components/image-options';

export const ImageTextOptions = (props) => {
  const {
    attributes: {
      imagePosition,
      styleFullHeight,
      buttonUrl,
      buttonStyleSize,
      buttonStyleSizeWidth,
      buttonStyleColor,
      buttonId,
      buttonIcon,
      buttonTitle,
      mediaUrl,
    },
    actions: {
      onChangeMedia,
      onChangeImagePosition,
      onChangeStyleFullHeight,
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

      <ImageOptions
        url={mediaUrl}
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
