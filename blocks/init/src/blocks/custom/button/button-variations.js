/* eslint-disable no-unused-vars */

import React from 'react';
import { registerBlockVariation } from '@wordpress/blocks';
import manifest from './manifest.json';
import globalManifest from '../../manifest.json';

export const variations = () => {
  registerBlockVariation(
    `${globalManifest.namespace}/${manifest.blockName}`,
    {
      title: `${manifest.title}-Block`,
      attributes: {
        button: {
          ...manifest.attributes.button.default,
          styleSizeWidth: 'block',
        },
      },
      icon: {
        background: globalManifest.background,
        foreground: globalManifest.foreground,
        src: manifest.icon.src,
      },
      scope: ['inserter'],
    }
  );
};
