import React from 'react'; // eslint-disable-line no-unused-vars
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { CarouselImageEditor } from './components/carousel-image-editor';
import './hooks';

export const CarouselImage = (props, { attributes }) => {

  const actions = getActions(props, manifest);

  return (
    <CarouselImageEditor
      attributes={attributes}
      actions={actions}
    />
  );
};
