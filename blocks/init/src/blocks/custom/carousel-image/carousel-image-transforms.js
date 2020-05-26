import { createBlock } from '@wordpress/blocks';
import manifest from '../../manifest.json';
import manifestCarouselImage from './manifest.json';
import manifestImage from '../image/manifest.json';

export const Transforms = {
  from: [
    {
      type: 'block',
      blocks: [`${manifest.namespace}/${manifestImage.blockName}`],
      transform: ({ media }) => (
        createBlock(`${manifest.namespace}/${manifestCarouselImage.blockName}`, {
          media,
        })
      ),
    },
  ],
};
