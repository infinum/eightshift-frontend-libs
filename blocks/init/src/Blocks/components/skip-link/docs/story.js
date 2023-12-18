import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { SkipLinkEditor } from '../components/skip-link-editor';
import { GetStoryComponentDescription, getStoryDescStyles } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/SkipLink',
};

const attributes = getExample('skipLink', manifest);

const style = getStoryDescStyles();
const additionalDescription = `
	<p class="${style.pSmall}">
		If you're using skip links to improve accessibility on your website
		(e. g., to conform to WCAG SC 2.4.1.), skip links should be the
		first focusable elements on your website or the applicable content block.

		This component doesn't modify the tabindex, so browsers automatically
		calculate its inherent tab order based on the position in the DOM.
		This is to support WCAG Techniques G1, G123 and G124 with the same component.

		Depending on which technique you use, you'll probably need to do one of the following:
	</p>
	<ul class="${style.ulSmall}">
		<li>ensure the component is positioned in the DOM so that it's the first focusable element, and there are no elements with a tabindex that prevents that</li>
		<li>add a tabindex to the component</li>
	</ul>

	<p class="${style.pSmall}">
		For more information on using skip links to improve accessibility, please see <a href="https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html">Understanding Success Criterion 2.4.1: Bypass Blocks</a>.

		To set the skip link target, set the 'skipLinkTarget' attribute.
	</p>
`;

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest} additionalDescription={additionalDescription}>
		<SkipLinkEditor {...props('skipLink', attributes)} />
	</GetStoryComponentDescription>
);
