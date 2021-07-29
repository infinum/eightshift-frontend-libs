import React, { useState } from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import { HamburgerEditor } from '../components/hamburger-editor';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

const attributes = getExample('hamburger', manifest);

export const editor = () => {
	const [open, setOpen] = useState(false);

	return (
		<HamburgerEditor
			{...props('hamburger', attributes, {
				additionalClass: ['is-always-visible', open ? 'is-menu-open' : ''].join(' '),
			})}
			onClick={() => setOpen(!open)} />
	);
};
