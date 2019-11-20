import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { ImageTextEditor } from './components/image-text-editor';
import { ImageTextOptions } from './components/image-text-options';

import { ButtonOptions } from './../../components/button/components/button-options';

export const ImageText = (props) => {
  const {
    attributes,
    attributes: {
      buttonUrl,
      buttonStyleSize,
      buttonStyleSizeWidth,
      buttonStyleColor,
      buttonId,
      buttonIcon,
      buttonTitle,
    },
    setAttributes,
  } = props;

  const actions = {
    ...getActions(props, manifest),
    onChangeMedia: (value) => {
      setAttributes({
        mediaId: value.id,
        mediaUrl: value.url,
      });
    },
  };

  return (
    <Fragment>
      <InspectorControls>
        <ImageTextOptions
          attributes={attributes}
          actions={actions}
        />
        <ButtonOptions
          url={buttonUrl}
          onChangeUrl={actions.onChangeButtonUrl}
          styleSize={buttonStyleSize}
          onChangeStyleSize={actions.onChangeButtonStyleSize}
          styleSizeWidth={buttonStyleSizeWidth}
          onChangeStyleSizeWidth={actions.onChangeButtonStyleSizeWidth}
          styleColor={buttonStyleColor}
          onChangeStyleColor={actions.onChangeButtonStyleColor}
          id={buttonId}
          onChangeId={actions.onChangeButtonId}
          icon={buttonIcon}
          onChangeIcon={actions.onChangeButtonIcon}
          title={buttonTitle}
          onChangeTitle={actions.onChangeButtonTitle}
        />
      </InspectorControls>
      <ImageTextEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
