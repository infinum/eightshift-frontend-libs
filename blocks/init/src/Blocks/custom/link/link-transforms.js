import React from 'react'; // eslint-disable-line no-unused-vars
import { createBlock } from '@wordpress/blocks';
import manifest from '../../manifest.json';
import manifestLink from './manifest.json';
import manifestButton from '../button/manifest.json';

export const transforms = {
    from: [
    {
        type: 'block',
        blocks: [`${manifest.namespace}/${manifestButton.blockName}`],
        transform: ({ button }) => (
        createBlock(
            `${manifest.namespace}/${manifestLink.blockName}`, {
                link: button,
            }
        )
      ),
    },
    ],
};
