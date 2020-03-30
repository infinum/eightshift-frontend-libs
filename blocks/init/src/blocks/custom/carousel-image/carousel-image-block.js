import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs';
import manifest from './manifest.json';
import { CarouselImageOptions } from './components/carousel-image-options';
import { CarouselImageEditor } from './components/carousel-image-editor';
import './hooks';

export const CarouselImage = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <CarouselImageOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <CarouselImageEditor
        attributes={attributes}
      />
    </Fragment>
  );
};
