import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { Fragment } from '@wordpress/element';
import { HamburgerEditor } from '../components/hamburger-editor';

export default {
	title: 'Components|Hamburger',
	parameters: {
		notes: readme,
	},
};

export const component = () => (
	<Fragment>
		{document.body.classList.remove('menu-is-open')}
		<HamburgerEditor />
	</Fragment>
);

export const open = () => (
	<Fragment>
		{document.body.classList.add('menu-is-open')}
		<HamburgerEditor />
	</Fragment>
);
