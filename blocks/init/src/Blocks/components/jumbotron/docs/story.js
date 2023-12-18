import React from 'react';
import { Fragment } from '@wordpress/element';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { JumbotronEditor } from '../components/jumbotron-editor';
import { JumbotronOptions } from '../components/jumbotron-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Jumbotron',
};

const attributes = getExample('jumbotron', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<JumbotronEditor {...props('jumbotron', attributes)} />
	</GetStoryComponentDescription>
);

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<JumbotronOptions
			{...props('jumbotron', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	</GetStoryComponentDescription>
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
	<GetStoryComponentDescription manifest={manifest}>
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
	</GetStoryComponentDescription>
);
