import { Gutenberg, blockDetails, hasWrapperDecorator } from 'EightshiftBlocksStorybookHelpers';
import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';
import readme from './readme.md';

export default {
  title: 'Blocks|Button',
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

export const block = () => (
  <Gutenberg props={blockDetails(manifest, globalManifest)} />
);
