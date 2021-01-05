import React from 'react';
import { Gutenberg, blockDetails } from '@eightshift/frontend-libs/scripts/storybook';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';
import readme from './readme.mdx';

export default {
	title: `Blocks/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

export const block = () => (
	<Gutenberg props={blockDetails(manifest, globalManifest)} />
);

