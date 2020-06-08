import React from 'react'; // eslint-disable-line no-unused-vars
import { createBlock } from '@wordpress/blocks';
import manifest from '../../manifest.json';
import manifestButton from './manifest.json';
import manifestLink from '../link/manifest.json';

export const transforms = {
  from: [
    {
      type: 'block',
      blocks: [`${manifest.namespace}/${manifestLink.blockName}`],
      transform: ({ link }) => (
        createBlock(`${manifest.namespace}/${manifestButton.blockName}`, {
          button: link,
        })
      ),
    },
  ],
};
