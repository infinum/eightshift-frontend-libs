import React from 'react';
import { Fragment } from '@wordpress/element';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { HeadingEditor } from '../components/heading-editor';
import { HeadingOptions } from '../components/heading-options';
import { HeadingToolbar } from '../components/heading-toolbar';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const props = manifest.example.attributes;

export const editor = () => (
	<HeadingEditor {...props} />
);

export const options = () => (
	<HeadingOptions {...props} />
);

export const toolbar = () => (
	<HeadingToolbar {...props} />
);

export const size = () => (
	<Fragment>
		{manifest.options.sizes.map((values, index) => (
			<Fragment key={index}>
				<HeadingEditor
					{...props}
					headingContent={values.label}
					headingSize={values.value}
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
					{...props}
					headingContent={`H - ${values.toString()}`}
					headingLevel={values}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const align = () => (
	<Fragment>
		{manifest.options.aligns.map((values, index) => (
			<Fragment key={index}>
				<HeadingEditor
					{...props}
					headingContent={values}
					headingAlign={values}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const color = () => (
	<Fragment>
		{manifest.options.colors.map((values, index) => (
			<Fragment key={index}>
				<HeadingEditor
					{...props}
					headingContent={values}
					headingColor={values}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);
