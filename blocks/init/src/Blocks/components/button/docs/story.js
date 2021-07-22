import React from 'react';
import { Fragment } from '@wordpress/element';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { ButtonEditor } from '../components/button-editor';
import { ButtonOptions } from '../components/button-options';
import { ButtonToolbar } from '../components/button-toolbar';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('button', manifest);

export const editor = () => (
	<ButtonEditor {...props('button', attributes)} />
);

export const options = () => (
	<ButtonOptions {...props('button', attributes, {
		options: getOptions(attributes, manifest),
	})} />
);

export const toolbar = () => (
	<ButtonToolbar {...props('button', attributes)} />
);

export const size = () => (
	<Fragment>
		{manifest.options.buttonSize.map((values, index) => (
			<Fragment key={index}>
				<ButtonEditor
					{...props('button', attributes, {
						buttonContent: values.label,
						buttonSize: values.value,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</Fragment>
);

export const width = () => (
	<Fragment>
		{manifest.options.buttonWidth.map((values, index) => (
			<Fragment key={index}>
				<ButtonEditor
					{...props('button', attributes, {
						buttonContent: values.label,
						buttonWidth: values.value,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</Fragment>
);

export const colors = () => (
	<Fragment>
		{manifest.options.buttonColor.map((values, index) => (
			<Fragment key={index}>
				<ButtonEditor
					{...props('button', attributes, {
						buttonContent: values,
						buttonColor: values,
					})}
				/>
				<br /><br />
				<ButtonEditor
					{...props('button', attributes, {
						buttonContent: `Button As Link - ${values}`,
						buttonColor: values,
						buttonIsLink: true,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</Fragment>
);
