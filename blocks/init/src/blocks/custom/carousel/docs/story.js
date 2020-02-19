/* eslint-disable no-unused-vars */

import { Gutenberg, blockDetails, hasWrapperDecorator } from 'EightshiftBlocksStorybookHelpers';
import React from 'react';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';
import readme from './readme.md';
import { block as item } from '../../carousel-image/docs/story';

export default {
  title: `Blocks|${manifest.title}`,
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

export const block = () => (
  <Gutenberg props={blockDetails(manifest, globalManifest, item())} />
);

