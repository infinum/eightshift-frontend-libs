import React from 'react';
import { Fragment } from '@wordpress/element';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { ListsEditor } from '../components/lists-editor';
import { ListsOptions } from '../components/lists-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Lists',
};

const attributes = getExample('lists', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<ListsEditor {...props('lists', attributes)} />
	</GetStoryComponentDescription>
);

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<ListsOptions
			{...props('lists', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	</GetStoryComponentDescription>
);

export const size = () => (
	<>
		{manifest.options.listsSize.map((values, index) => (
			<Fragment key={index}>
				<ListsEditor
					{...props('lists', attributes, {
						listsContent: `<li>List Item ${values.label} 1</li><li>List Item ${values.label} 2</li>`,
						listsSize: values.value,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</>
);

export const color = () => (
	<>
		{manifest.options.listsColor.map((values, index) => (
			<Fragment key={index}>
				<ListsEditor
					{...props('lists', attributes, {
						listsContent: `<li>List Item ${values} 1</li><li>List Item ${values} 2</li>`,
						listsColor: values,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</>
);

export const colorOnlyMarkers = () => (
	<>
		{manifest.options.listsColor.map((values, index) => (
			<Fragment key={index}>
				<ListsEditor
					{...props('lists', attributes, {
						listsContent: `<li>List Item ${values} 1</li><li>List Item ${values} 2</li>`,
						listsColor: values,
						listsColorOnlyMarker: true,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</>
);
