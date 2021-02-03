import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { IconEditor } from '../components/icon-editor';
import { IconOptions } from '../components/icon-options';

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
	<IconEditor {...props} />
);

export const options = () => (
	<IconOptions {...props} />
);

export const color = () => (
	<Fragment>
		{manifest.options.colors.map((values, index) => (
			<Fragment key={index}>
				<IconEditor
					{...props}
					iconColor={values}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);
