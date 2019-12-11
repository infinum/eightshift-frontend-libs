import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { CarouselImageEditor } from './components/carousel-image-editor';
import { ImageOptions } from '../../components/image/components/image-options';

export const CarouselImage = (props) => {
  const {
    setAttributes,
    attributes,
    attributes: {
      mediaUrl,
    },
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
        <PanelBody title={__('Carousel Image Details', 'eightshift-boilerplate')}>
          <ImageOptions
            url={mediaUrl}
            onChangeMedia={actions.onChangeMedia}
          />
        </PanelBody>
      </InspectorControls>
      <CarouselImageEditor
        attributes={attributes}
      />
    </Fragment>
  );
};
