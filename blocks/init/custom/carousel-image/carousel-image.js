import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';

import { CarouselImageEditor } from './components/carousel-image-editor';
import { CarouselImageOptions } from './components/carousel-image-options';

export const CarouselImage = (props) => {
  const {
    setAttributes,
    attributes,
  } = props;

  const actions = {
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
        <CarouselImageOptions
          actions={actions}
        />
      </InspectorControls>
      <CarouselImageEditor
        attributes={attributes}
      />
    </Fragment>
  );
};
