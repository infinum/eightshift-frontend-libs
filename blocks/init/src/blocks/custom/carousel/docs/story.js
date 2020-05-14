/* eslint-disable no-unused-vars */

import { Gutenberg, blockDetails } from '@eightshift/frontend-libs/scripts/storybook';
import React from 'react';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';
import readme from './readme.md';
import { block as item, block2 as item2, block3 as item3 } from '../../carousel-image/docs/story';

export default {
  title: `Blocks|${manifest.title}`,
  parameters: {
    notes: readme,
  },
};

export const block = () => (
  <Gutenberg props={blockDetails(manifest, globalManifest, [item(), item2(), item3()], 3)} />
);

