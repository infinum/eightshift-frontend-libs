import React from 'react';
import { Fragment } from '@wordpress/element';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { HeadingEditor } from '../components/heading-editor';
import { HeadingOptions } from '../components/heading-options';

export default {
	title: 'Components/Heading',
};

const attributes = getExample('heading', manifest);

export const editor = () => (
	<HeadingEditor {...props('heading', attributes)} />
);

export const options = () => (
	<HeadingOptions
		{...props('heading', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

export const size = () => (
	<Fragment>
		{manifest.options.headingSize.map((values, index) => (
			<Fragment key={index}>
				<HeadingEditor
					{...props('heading', attributes, {
						headingContent: values.label,
						headingSize: values.value,
					})}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const level = () => (
	<Fragment>
		{Array.from({ length: 6 }, (x, i) => i + 1).map((values, index) => (
			<Fragment key={index}>
				<HeadingEditor
					{...props('heading', attributes, {
						headingContent: `H${values.toString()}`,
						headingLevel: values,
					})}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const color = () => (
	<Fragment>
		{manifest.options.headingColor.map((values, index) => (
			<Fragment key={index}>
				<HeadingEditor
					{...props('heading', attributes, {
						headingContent: values,
						headingColor: values,
					})}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);
