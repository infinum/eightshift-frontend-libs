/* eslint-disable no-unused-vars */

import { Gutenberg, blockDetails } from './node_modules/@eightshift/frontend-libs/scripts/storybook';
import React from './node_modules/react';
import manifest from '../manifest.json';
import globalManifest from '../../../manifest.json';
import readme from './readme.md';

export default {
  title: `Variations|${manifest.title}`,
  parameters: {
    notes: readme,
  },
};

export const block = () => (
  <Gutenberg props={blockDetails(manifest, globalManifest, true)} />
);

