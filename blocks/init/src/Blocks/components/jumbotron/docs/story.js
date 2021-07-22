import React from 'react';
import { Fragment } from '@wordpress/element';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { JumbotronEditor } from '../components/jumbotron-editor';
import { JumbotronOptions } from '../components/jumbotron-options';
import { JumbotronToolbar } from '../components/jumbotron-toolbar';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('jumbotron', manifest);

export const editor = () => (
	<JumbotronEditor {...props('jumbotron', attributes)} />
);

export const options = () => (
	<JumbotronOptions
		{...props('jumbotron', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

export const toolbar = () => (
	<JumbotronToolbar {...props('jumbotron', attributes)} />
);

const aligns = [
	'top left',
	'top center',
	'top right',
	'center left',
	'center center',
	'center right',
	'bottom left',
	'bottom center',
	'bottom right',
];

export const contentAlign = () => (
	<div>
		{aligns.map((values, index) => (
			<Fragment key={index}>
				<JumbotronEditor
					{...props('jumbotron', attributes, {
						jumbotronContentPosition: values,
					})}
				/>
				<br />
			</Fragment>
		))}
	</div>
);
