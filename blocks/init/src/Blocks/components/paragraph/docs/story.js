import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import { Fragment } from '@wordpress/element';
import manifest from './../manifest.json';
import { ParagraphEditor } from '../components/paragraph-editor';
import { ParagraphOptions } from '../components/paragraph-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Paragraph',
};

const attributes = getExample('paragraph', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<ParagraphEditor {...props('paragraph', attributes)} />
	</GetStoryComponentDescription>
);

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<ParagraphOptions
			{...props('paragraph', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	</GetStoryComponentDescription>
);

export const size = () => (
	<>
		{manifest.options.paragraphSize.map((values, index) => (
			<Fragment key={index}>
				<ParagraphEditor
					{...props('paragraph', attributes, {
						paragraphContent: values.label, 
						paragraphSize: values.value, 
					})}
				/>
				<br />
			</Fragment>
		))}
	</>
);

export const color = () => (
	<>
		{manifest.options.paragraphColor.map((values, index) => (
			<Fragment key={index}>
				<ParagraphEditor
					{...props('paragraph', attributes, {
						paragraphContent: values,
						paragraphColor: values,
					})}
				/>
				<br />
			</Fragment>
		))}
	</>
);
export const colorWithLink = () => (
	<>
		{manifest.options.paragraphColor.map((values, index) => (
			<Fragment key={index}>
				<ParagraphEditor
					{...props('paragraph', attributes, {
						paragraphContent: `${values} - Lorem ipsum dolor sit amet, <a href="#">consectetur</a> adipiscing elit.`,
						paragraphColor: values,
					})}
				/>
				<br />
			</Fragment>
		))}
	</>
);
