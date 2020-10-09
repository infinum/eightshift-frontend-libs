import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { LogoEditor } from '../components/logo-editor';

export default {
	title: 'Components|Logo',
	parameters: {
		notes: readme,
	},
};

const props = {
	src: 'https://raw.githubusercontent.com/infinum/eightshift-frontend-libs/develop/package/eightshift-logo.svg?raw=true&sanitize=true',
	alt: 'This is Alt',
	title: 'This is Alt',
	href: 'https://infinum.github.io/eightshift-docs/',
};

export const component = () => (
	<LogoEditor {...props} />
);
