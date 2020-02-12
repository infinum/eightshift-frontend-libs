/* eslint-disable no-unused-vars */

import { Gutenberg, blockDetails, hasWrapperDecorator } from 'EightshiftBlocksStorybookHelpers';
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
