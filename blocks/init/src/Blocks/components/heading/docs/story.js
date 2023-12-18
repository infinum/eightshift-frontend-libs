import React from 'react';
import { Fragment } from '@wordpress/element';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { HeadingEditor } from '../components/heading-editor';
import { HeadingOptions } from '../components/heading-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Heading',
};

const attributes = getExample('heading', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<HeadingEditor {...props('heading', attributes)} />
	</GetStoryComponentDescription>
);

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<HeadingOptions
			{...props('heading', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	</GetStoryComponentDescription>
);

export const size = () => (
	<>
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
	</>
);

export const level = () => (
	<>
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
	</>
);

export const color = () => (
	<>
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
	</>
);
