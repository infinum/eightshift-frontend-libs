/* eslint-disable no-unused-vars */

import { Gutenberg, blockDetails, hasWrapperDecorator } from '@eightshift/frontend-libs/scripts/storybook';
import React from 'react';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';
import readme from './readme.md';

export default {
  title: `Blocks|${manifest.title}`,
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

export const block = () => (
  <Gutenberg props={blockDetails(manifest, globalManifest)} />
);

export const block2 = () => (
  <Gutenberg props={blockDetails({
    ...manifest,
    example: manifest.example2,
  }, globalManifest)} />
);

export const block3 = () => (
  <Gutenberg props={blockDetails({
    ...manifest,
    example: manifest.example3,
  }, globalManifest)} />
);
