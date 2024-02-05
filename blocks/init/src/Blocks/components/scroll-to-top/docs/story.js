import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { ScrollToTopEditor } from '../components/scroll-to-top-editor';

export default {
	title: 'Components/Scroll to top',
};

const attributes = getExample('scrollToTop', manifest);

export const editor = () => (
	<ScrollToTopEditor {...props('scrollToTop', attributes)} />
);
