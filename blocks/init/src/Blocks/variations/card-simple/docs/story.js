import React from 'react';
import manifest from './../manifest.json';
import { Gutenberg } from '../../../../../../../.storybook/assets';

export default {
	title: 'Variations/Card Simple',
};

export const block = () => <Gutenberg manifest={manifest} isVariation={true} />;
