import React, { useState } from 'react';
import manifest from './../manifest.json';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import { HamburgerEditor } from '../components/hamburger-editor';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Hamburger',
};

const attributes = getExample('hamburger', manifest);

export const editor = () => {
	const [open, setOpen] = useState(false);

	return (
		<GetStoryComponentDescription manifest={manifest}>
			<HamburgerEditor
				{...props('hamburger', attributes, {
					additionalClass: ['is-always-visible', open ? 'is-menu-open' : ''].join(' '),
				})}
				onClick={() => setOpen(!open)} />
		</GetStoryComponentDescription>
	);
};
