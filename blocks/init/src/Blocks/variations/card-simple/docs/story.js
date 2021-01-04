/* eslint-disable no-unused-vars */

import { Gutenberg, blockDetails } from '@eightshift/frontend-libs/scripts/storybook';
import React from 'react';
import manifest from '../manifest.json';
import globalManifest from '../../../manifest.json';
import readme from './readme.mdx';

export default {
	title: `Variations/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

export const block = () => (
	<Gutenberg props={blockDetails(manifest, globalManifest, true)} />
);
