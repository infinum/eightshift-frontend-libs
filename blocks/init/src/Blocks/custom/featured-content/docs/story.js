import React from 'react';
import { Gutenberg, blockDetails } from '@eightshift/frontend-libs/scripts/storybook';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export default {
	title: 'Blocks/Featured content',
};

export const block = () => (
	<Gutenberg props={blockDetails(manifest, globalManifest)} />
);
