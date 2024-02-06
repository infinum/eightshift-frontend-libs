import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';
import { ButtonEditor } from '../components/button-editor';
import { ButtonOptions } from '../components/button-options';

export default {
	title: 'Components/Button',
};

const attributes = getExample('button', manifest);

export const editor = () => (
	<ButtonEditor {...props('button', attributes)} />
);

export const options = () => (
	<ButtonOptions {...props('button', attributes, {
		options: getOptions(attributes, manifest),
	})} />
);
