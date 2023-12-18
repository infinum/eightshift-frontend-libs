import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { ScrollToTopEditor } from '../components/scroll-to-top-editor';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Scroll To Top',
};

const attributes = getExample('scrollToTop', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<ScrollToTopEditor {...props('scrollToTop', attributes)} />
	</GetStoryComponentDescription>
);
