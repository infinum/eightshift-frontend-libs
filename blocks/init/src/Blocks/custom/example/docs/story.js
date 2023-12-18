import React from 'react';
import manifest from './../manifest.json';
import { Gutenberg } from '../../../../../../../.storybook/assets';

export default {
	title: 'Blocks/Example',
};

export const block = () => <Gutenberg manifest={manifest}/>;
