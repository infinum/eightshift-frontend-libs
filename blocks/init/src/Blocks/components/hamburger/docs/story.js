import React from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { HamburgerEditor } from '../components/hamburger-editor';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const open = () => document.body.classList.add('is-menu-open');
const close = () => document.body.classList.remove('is-menu-open');

export const editor = () => {
	close();

	return (
		<div>
			<div>This element is visible only on a small screen.</div>
			<br /><br />
			<HamburgerEditor />
		</div>
	);
};

export const isOpen = () => {
	open();

	return (
		<div>
			<div>This element is visible only on a small screen.</div>
			<br /><br />
			<HamburgerEditor />
		</div>
	);
};
