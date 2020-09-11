import React from 'react'; // eslint-disable-line no-unused-vars
import { createBlock } from '@wordpress/blocks';
import manifest from '../../manifest.json';
import manifestImage from './manifest.json';
import manifestCarouselImage from '../carousel-image/manifest.json';

export const transforms = {
  from: [
    {
      type: 'block',
      blocks: [`${manifest.namespace}/${manifestCarouselImage.blockName}`],
      transform: ({ media }) => (
        createBlock(`${manifest.namespace}/${manifestImage.blockName}`, {
          media,
        })
      ),
    },
  ],
};
